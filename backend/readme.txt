🧪 MedSafe AI — Medication Interaction Checker
AI-powered medical assistant for checking drug–drug interactions, built with BioBERT, FLAN-T5 & FastAPI.

MedSafe AI is an intelligent medication-safety web application that helps users check interactions between two or more medicines, understand risks, read AI-generated medical explanations, and get safer alternatives—all in simple language.

This project uses real NLP models (BioBERT, FLAN-T5) and performs inference locally, making it free, reliable, and privacy-friendly.

📌 Table of Contents

About the Project

Features

System Architecture

Tech Stack

Backend Models Explained

Frontend Modules

Full Folder Structure

Setup / Installation

How to Run (Backend + Frontend)

What Modifications Were Made

What You Learned

What You Should Avoid

Future Enhancements

📖 1. About the Project

Many patients take multiple medicines prescribed by different doctors—or combine prescription drugs with over-the-counter medicines without understanding their possible Drug–Drug Interactions (DDIs).

This can cause:

❌ Internal bleeding
❌ Liver damage
❌ Kidney stress
❌ Reduced effectiveness
❌ Dangerous side effects

MedSafe AI solves this problem using:

BioBERT → understands biomedical text

FLAN-T5 → generates detailed medical explanations

FastAPI backend → handles predictions

Firebase Auth → secure Google login

Clean frontend UI → medications input + results

The result is a user-friendly medical assistant.

⭐ 2. Features
🔐 Authentication

Google Login (Firebase)

Logout

Session stored via localStorage

💊 Medication Interaction Checker

Add multiple medications

Auto-generate drug pairs

Call backend for each pair

Display interaction level: High / Moderate / Low

Display BioBERT similarity score

🤖 AI Medical Explanation

Each pair receives a unique explanation containing:

What happens when the drugs mix

Body organs affected

Expected side effects

High-risk groups

Safer alternatives

Practical recommendations

🧠 Unique Response Generation

FLAN-T5 sampler mode

top-p sampling

temperature

repetition penalty
👉 Ensures different medical explanations every time.

🏛 3. System Architecture
Frontend (HTML/CSS/JS)
       ↓
Firebase Authentication
       ↓
Medication Input (medication.html)
       ↓
Backend API (FastAPI @ /predict)
       ↓
BioBERT → Computes similarity between medicines
       ↓
FLAN-T5 → Generates medical explanation
       ↓
Frontend UI → Shows risk cards + reasoning

🧰 4. Tech Stack
🟦 Frontend

HTML

CSS

JavaScript

Firebase Authentication

Live Server (VS Code)

🟩 Backend

Python

FastAPI

Uvicorn

Transformers (Hugging Face)

BioBERT (dmis-lab/biobert-v1.1)

FLAN-T5-small/Base

🟨 Tools

VS Code

Postman / Swagger UI

Environment variables (.env)

🧠 5. Backend Models Explained
🔬 BioBERT (dmis-lab/biobert-v1.1)

Used for:

Converting medicines to embeddings

Computing similarity

Deciding risk levels

🧠 FLAN-T5

Used for:

Generating detailed medical explanation

Writing summaries

Suggesting safer alternatives

Producing human-like, varied responses

🖥 6. Frontend Modules
login.html

Google login button

Redirects to medication.html

medication.html

Add medication

Remove medication

Check interactions

Show results

Logout

script.js

Manages UI logic

Calls backend API

Manages Firebase auth

📁 7. Folder Structure
ps_1/
│
├── backend/
│   ├── main.py
│   ├── model_utils.py
│   ├── model_api.py
│   ├── requirements.txt
│   ├── .env
│   └── __pycache__/
│
└── frontend/
    ├── index.html
    ├── login.html
    ├── medication.html
    ├── script.js
    ├── styles.css
    ├── firebase.js
    ├── model_api.js
    └── auth.js

⚙️ 8. Setup / Installation
Backend Installation
cd backend
pip install -r requirements.txt


Add .env file:

HF_TOKEN=your_token_here

▶ 9. How to Run the Project
Start backend
cd backend
uvicorn main:app --reload


Backend runs on:

http://127.0.0.1:8000


Test API:

http://127.0.0.1:8000/docs

Start frontend

Use VS Code Live Server.

Open:

frontend/index.html


Flow:

index → login → medication → interaction results

🔧 10. Key Modifications Already Done
Backend Improvements

✔ Improved FLAN-T5 prompt
✔ Added model fallback system
✔ Avoided markdown issues
✔ Added fully unique outputs
✔ Randomized messages
✔ Added mean pooling for stable embeddings
✔ Removed template repeats
✔ Added safeguards against generation failures

Frontend Fixes

✔ Wrong page redirects fixed
✔ Google login fixed
✔ Removed signup page
✔ Removed profile.html
✔ Navigation cleaned
✔ Medication input system redesigned
✔ Better responsive UI

Code Structure Improvements

✔ Replaced multiple scripts with one master script.js
✔ Unified API calling
✔ Removed unused Firebase files

📚 11. What You Learned
🔥 Backend & AI Concepts

How to load HuggingFace models

How BioBERT embeddings work

Cosine similarity for drug comparison

Prompt engineering for medical tasks

How to generate unique responses

How to avoid model hallucinations

How FastAPI handles requests

🔥 Frontend Concepts

Firebase Authentication

DOM manipulation

Managing dynamic lists

REST API calls

UI state toggling (loading, results, errors)

🔥 Deployment Concepts

Local inference vs cloud inference

Why GPUs matter

Why fine-tuning is optional for prototypes

🚫 12. What You Should NOT Do

❌ Do not host backend models on shared hosting
❌ Do not use Google Firebase for sensitive medical records
❌ Do not expose HF_TOKEN in frontend
❌ Do not run BioBERT on <8GB RAM machines
❌ Do not compare more than 10 medicine combinations at once
❌ Do not use beam search for varied outputs
❌ Do not store medical data in Firestore without encryption

🚀 13. Future Enhancements

I can add the next features if you want:

🩺 Disease-based personalization
📸 OCR — scan medicine strips
🔊 Voice input for medicines
🧾 PDF report generator
📱 Mobile app version (Flutter / React Native)
📈 Interaction severity graph
🧬 Real medical datasets for training
💾 Local embedding caching (much faster)