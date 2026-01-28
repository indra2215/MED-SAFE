const API_URL = "http://127.0.0.1:8000/predict";

/* ------------------ HOME PAGE LOGIC ------------------ */
if (document.getElementById("check-btn")) {

    async function fetchInteraction(drug1, drug2) {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ drug1, drug2 })
        });

        const result = await res.json();
        if (!result.success) return null;

        return result.data;
    }

    async function checkInteractions(meds) {
        const output = [];
        for (let i = 0; i < meds.length; i++) {
            for (let j = i + 1; j < meds.length; j++) {
                const r = await fetchInteraction(meds[i], meds[j]);
                if (r) output.push(r);
            }
        }
        return output;
    }

    document.getElementById("check-btn").addEventListener("click", async () => {
        const meds = [];
        for (let i = 1; i <= 5; i++) {
            const v = document.getElementById(`med${i}`).value.trim();
            if (v) meds.push(v);
        }

        if (meds.length < 2) {
            alert("Enter at least two medications.");
            return;
        }

        document.getElementById("loading").classList.remove("hidden");
        document.getElementById("results").classList.add("hidden");

        const results = await checkInteractions(meds);

        document.getElementById("loading").classList.add("hidden");

        const list = document.getElementById("interaction-list");
        list.innerHTML = "";

        results.forEach(r => {
            const card = document.createElement("div");
            card.className = "interaction-card";

            let badgeClass = "risk-moderate";
            if (r.interaction_level.includes("High")) badgeClass = "risk-high";
            if (r.interaction_level.includes("Low")) badgeClass = "risk-low";

            card.innerHTML = `
                <div class="risk-badge ${badgeClass}">${r.interaction_level}</div>
                <h3>${r.drug1} + ${r.drug2}</h3>

                <p><strong>Similarity:</strong> ${r.similarity.toFixed(4)}</p>

                <p class="section-title">🧪 BioBERT Reason</p>
                <p>${r.bio_bert_message}</p>

                <p class="section-title">🤖 FLAN Explanation</p>
                <p>${r.flan_explanation}</p>
            `;
            list.appendChild(card);
        });

        document.getElementById("results").classList.remove("hidden");
    });

    document.getElementById("reset-btn").addEventListener("click", () => {
        for (let i = 1; i <= 5; i++) {
            document.getElementById(`med${i}`).value = "";
        }

        document.getElementById("results").classList.add("hidden");
        document.getElementById("loading").classList.add("hidden");
    });
}

/* ------------------ LOGIN PAGE ------------------ */
if (document.getElementById("login-btn")) {
    document.getElementById("login-btn").addEventListener("click", () => {
        alert("Login logic to be added. (Firebase recommended)");
    });
}

/* ------------------ SIGNUP PAGE ------------------ */
if (document.getElementById("signup-btn")) {
    document.getElementById("signup-btn").addEventListener("click", () => {
        alert("Signup logic to be added.");
    });
}
