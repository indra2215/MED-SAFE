MEDSAFE – AI-Powered Medication Interaction Checker

MEDSAFE is a full-stack AI-powered web application that analyzes potential drug–drug interactions using transformer-based NLP models.

It integrates:

🔐 Firebase Authentication (Google Login)

🌐 Frontend hosted on Vercel

🤖 Backend hosted on Hugging Face Spaces

🧠 Transformer-based medical analysis models

🌍 Live Deployment
🔵 Frontend (User Interface)

Hosted on Vercel

https://your-vercel-app.vercel.app

🟡 Backend API

Hosted on Hugging Face Spaces

https://indrasr-medsafe.hf.space

🔎 API Documentation (Swagger UI)
https://indrasr-medsafe.hf.space/docs

🧠 System Architecture
User (Browser)
     ↓
Vercel (Frontend: HTML + JS + Firebase)
     ↓
Hugging Face Space (FastAPI Backend)
     ↓
Transformer Models (BioBERT + FLAN-T5)

🏗 Project Structure
MED-SAFE/
│
├── main.py                # FastAPI backend
├── model_utils.py         # Model loading and inference logic
├── model_api.py           # API helper logic
├── requirements.txt       # Backend dependencies
├── Dockerfile             # HF Space container config
│
└── frontend/
    ├── index.html         # Landing page
    ├── login.html         # Google login page
    ├── medication.html    # Interaction checker UI
    ├── styles.css         # Styling
    └── script.js          # Frontend logic + API calls

⚙️ Technology Stack
Backend

FastAPI

Uvicorn

Hugging Face Transformers

PyTorch

BioBERT

FLAN-T5

Hugging Face Spaces (Docker SDK)

Frontend

HTML5

CSS3

Vanilla JavaScript (ES Modules)

Firebase Authentication

Hosting

GitHub (Source Control)

Hugging Face (Backend Hosting)

Vercel (Frontend Hosting)

🔐 Authentication Flow

User clicks Login with Google

Firebase authenticates user

User is redirected to medication.html

Authenticated user can run interaction analysis

Firebase is configured with:

Google Sign-in enabled

Vercel domain added to Authorized Domains

🔁 Data Flow (Step-by-Step)
Step 1 — User Input

User adds medications in frontend UI.

Step 2 — API Call

Frontend sends POST request:

POST /predict
{
  "drug1": "Aspirin",
  "drug2": "Warfarin"
}


to:

https://indrasr-medsafe.hf.space/predict

Step 3 — Backend Processing

FastAPI:

Receives request

Calls check_interaction()

Uses:

Embedding similarity

BioBERT explanation

FLAN-T5 natural language explanation

Step 4 — Response

Returns structured JSON:

{
  "success": true,
  "data": {
    "drug1": "...",
    "drug2": "...",
    "interaction_level": "...",
    "similarity": 0.967,
    "bio_bert_message": "...",
    "flan_explanation": "..."
  }
}

Step 5 — UI Rendering

Frontend displays formatted interaction card.

☁️ Hosting Breakdown
GitHub

Stores source code

Version control

Triggers automatic deployments

Hugging Face Space

Runs backend API inside Docker container

Installs dependencies from requirements.txt

Launches FastAPI using Uvicorn

Serves /predict endpoint

Vercel

Serves static frontend files

Executes script.js

Calls Hugging Face API

Handles Firebase authentication

🔄 Development Workflow
Backend Change
Edit main.py
git add .
git commit -m "Update backend"
git push


Hugging Face automatically rebuilds Space.

Frontend Change
Edit frontend files
git add .
git commit -m "Update frontend"
git push


Vercel automatically redeploys.

🧪 Running Locally
Backend
git clone https://github.com/indra2215/MED-SAFE.git
cd MED-SAFE
pip install -r requirements.txt
uvicorn main:app --reload


Open:

http://127.0.0.1:8000/docs

Frontend

Open:

frontend/index.html


Make sure API_URL is set to local backend if testing locally.

📦 Environment & Storage

Models are loaded dynamically via Hugging Face Transformers.

No user data is stored permanently.

Authentication handled by Firebase.

Backend is stateless.

Each request is processed independently.

🔐 CORS Configuration

Currently:

allow_origins=["*"]


Can be restricted to:

allow_origins=["https://your-vercel-app.vercel.app"]


for production security.

🚀 Future Improvements

Add database logging

Add user medication history

Add rate limiting

Add API key security

Improve model fine-tuning

Add loading indicators

Improve explanation quality

Add CI/CD checks

📌 Key Learnings From This Architecture

Separation of concerns is critical.

Frontend and backend must be deployed independently.

Authentication must be configured with authorized domains.

CORS must allow frontend domain.

API endpoints must match frontend fetch URLs.

🏁 Conclusion

MEDSAFE demonstrates a full-stack AI deployment architecture integrating:

Cloud backend inference

Static frontend hosting

Secure authentication

Transformer-based NLP reasoning

This architecture is production-ready and scalable.
