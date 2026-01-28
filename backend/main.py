from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from model_utils import check_interaction

app = FastAPI()

# Allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class InteractionRequest(BaseModel):
    drug1: str
    drug2: str

@app.post("/predict")
def predict(req: InteractionRequest):
    try:
        result = check_interaction(req.drug1, req.drug2)
        return {"success": True, "data": result}
    except Exception as e:
        return {"success": False, "error": str(e)}

