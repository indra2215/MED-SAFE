import numpy as np
import torch
from transformers import AutoTokenizer, AutoModel, AutoModelForSeq2SeqLM, T5Tokenizer

device = "cuda" if torch.cuda.is_available() else "cpu"

# ---- MODELS ----
BIOBERT_MODEL = "dmis-lab/biobert-v1.1"
FLAN_MODEL = "google/flan-t5-small"   # works, but fragile

bio_tok = AutoTokenizer.from_pretrained(BIOBERT_MODEL)
bio_model = AutoModel.from_pretrained(BIOBERT_MODEL).to(device)

flan_tok = T5Tokenizer.from_pretrained(FLAN_MODEL)
flan_model = AutoModelForSeq2SeqLM.from_pretrained(FLAN_MODEL).to(device)


# ------------------------- EMBEDDING FUNCTION -------------------------
def get_embedding(text: str):
    inputs = bio_tok(text, return_tensors="pt", truncation=True, padding=True).to(device)
    with torch.no_grad():
        outputs = bio_model(**inputs).last_hidden_state[:, 0, :]
    v = outputs.cpu().numpy()[0]
    return v / (np.linalg.norm(v) + 1e-8)


# ------------------------- RISK CLASSIFICATION -------------------------
def classify_interaction(sim):
    if sim > 0.75:
        return (
            "High Potential Interaction",
            "These medicines show strong similarity and may increase bleeding risk or organ stress."
        )
    elif sim > 0.55:
        return (
            "Moderate Interaction",
            "Some overlap in pharmacological pathways. Use with caution."
        )
    else:
        return (
            "Low Interaction",
            "These medicines do not significantly overlap in action."
        )


# ------------------------- AI EXPLANATION (FORCED COMPLETION) -------------------------
def explain(drug1, drug2, level):

    # 🔑 Completion-style prompt (NO instructions)
    prompt = (
        f"Medical interaction explanation.\n"
        f"Drugs involved: {drug1} and {drug2}.\n"
        f"Risk level: {level}.\n\n"
        f"Explanation: "
    )

    inputs = flan_tok(prompt, return_tensors="pt").to(device)

    with torch.no_grad():
        out = flan_model.generate(
            **inputs,
            max_length=450,
            min_length=150,            # 🔑 forces real content
            num_beams=5,
            temperature=0.4,
            repetition_penalty=1.4,
            no_repeat_ngram_size=3,
            early_stopping=True
        )

    text = flan_tok.decode(out[0], skip_special_tokens=True)

    # ---------------- CLEANUP FILTER ----------------
    # Remove task-echo if model still tries
    banned_phrases = [
        "describe the interaction",
        "explain the interaction",
        "explain how",
        "describe how",
        "explain common side effects",
        "medical interaction explanation"
    ]

    for phrase in banned_phrases:
        text = text.replace(phrase, "")

    return text.strip()


# ------------------------- MAIN INTERACTION FUNCTION -------------------------
def check_interaction(drug1, drug2):

    v1 = get_embedding(drug1)
    v2 = get_embedding(drug2)

    sim = float(np.dot(v1, v2))

    level, bio_msg = classify_interaction(sim)
    flan_explanation = explain(drug1, drug2, level)

    return {
        "drug1": drug1,
        "drug2": drug2,
        "similarity": round(sim, 3),
        "interaction_level": level,
        "bio_bert_message": bio_msg,
        "flan_explanation": flan_explanation
    }
