/* ---------------- FIREBASE ------------------- */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCPLIhWeGDQQFm_ZxUdc7vgvAGGzypKrBI",
    authDomain: "ddips-666aa.firebaseapp.com",
    projectId: "ddips-666aa",
    storageBucket: "ddips-666aa.appspot.com",
    messagingSenderId: "319066136832",
    appId: "1:319066136832:web:1cd31c246b17ef432813e5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

/* ------------ BACKEND API (HF SPACE) ------------ */
const API_URL = "https://indrasr-medsafe.hf.space/predict";

/* ------------ LOGIN PAGE ------------ */
const googleBtn = document.getElementById("googleLoginBtn");

if (googleBtn) {
    googleBtn.addEventListener("click", async () => {
        try {
            await signInWithPopup(auth, provider);
            window.location.href = "/medication"; // Updated route
        } catch (error) {
            alert("Google Login Failed. Try Again.");
        }
    });
}

/* ------------ LOGOUT BUTTON ------------ */
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
        await signOut(auth);
        window.location.href = "/"; // Updated route
    });
}

/* ------------ MEDICATION PAGE ------------ */
let meds = [];
const medList = document.getElementById("medList");

function renderList() {
    if (!medList) return;

    medList.innerHTML = "";
    meds.forEach((m, i) => {
        const div = document.createElement("div");
        div.className = "med-item-added";

        div.innerHTML = `
            <div>
                <strong>${m.name}</strong><br>
                <small>${m.dosage || ""} ${m.freq || ""}</small>
            </div>
            <button class="btn btn-outline" onclick="removeMed(${i})">Remove</button>
        `;

        medList.appendChild(div);
    });
}

window.removeMed = function (i) {
    meds.splice(i, 1);
    renderList();
};

const addBtn = document.getElementById("addMedBtn");
if (addBtn) {
    addBtn.addEventListener("click", () => {
        const name = document.getElementById("medName").value.trim();
        const dosage = document.getElementById("medDosage").value.trim();
        const freq = document.getElementById("medFreq").value;

        if (!name) return alert("Enter medication name!");

        meds.push({ name, dosage, freq });
        renderList();
    });
}

/* ------------ API CALL ------------ */
const checkBtn = document.getElementById("checkInteractionsBtn");
const resultsBox = document.getElementById("resultsSection");
const resultsList = document.getElementById("resultsList");

if (checkBtn) {
    checkBtn.addEventListener("click", async () => {
        resultsList.innerHTML = "";
        resultsBox.classList.remove("hidden");

        if (meds.length < 2) {
            alert("Add at least two medications.");
            return;
        }

        let pairs = [];
        for (let i = 0; i < meds.length; i++) {
            for (let j = i + 1; j < meds.length; j++) {
                pairs.push([meds[i].name, meds[j].name]);
            }
        }

        for (let [d1, d2] of pairs) {
            try {
                const response = await fetch(API_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ drug1: d1, drug2: d2 })
                });

                const data = await response.json();

                if (data.success) {
                    showResult(data.data);
                } else {
                    showError(data.error);
                }

            } catch (error) {
                showError("API request failed.");
            }
        }
    });
}

function showResult(d) {
    const card = document.createElement("div");
    card.className = "interaction-card";

    card.innerHTML = `
        <h3>${d.drug1} + ${d.drug2}</h3>
        <p><strong>Risk:</strong> ${d.interaction_level}</p>
        <p><strong>Similarity:</strong> ${d.similarity.toFixed(3)}</p>
        <p><strong>BioBERT:</strong> ${d.bio_bert_message}</p>
        <p><strong>FLAN Explanation:</strong> ${d.flan_explanation}</p>
    `;

    resultsList.appendChild(card);
}

function showError(msg) {
    const card = document.createElement("div");
    card.className = "interaction-card";
    card.style.border = "2px solid red";
    card.innerHTML = `<p><strong>Error:</strong> ${msg}</p>`;
    resultsList.appendChild(card);
}

/* ------------ CLEAR ------------ */
const clearBtn = document.getElementById("clearAllBtn");

if (clearBtn) {
    clearBtn.addEventListener("click", () => {
        meds = [];
        renderList();
        resultsList.innerHTML = "";
        resultsBox.classList.add("hidden");
    });
}
