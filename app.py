from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np

model  = joblib.load("placement_model.pkl")
scaler = joblib.load("scaler.pkl")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class StudentData(BaseModel):
    IQ: float
    Prev_Sem_Result: float
    CGPA: float
    Academic_Performance: float
    Internship_Experience: int   # 1=Yes, 0=No
    Extra_Curricular_Score: float
    Communication_Skills: float
    Projects_Completed: float

@app.get("/")
def home():
    return {"message": "Placement Prediction API is running!"}

@app.post("/predict")
def predict(data: StudentData):
    features = np.array([[
        data.IQ, data.Prev_Sem_Result, data.CGPA,
        data.Academic_Performance, data.Internship_Experience,
        data.Extra_Curricular_Score, data.Communication_Skills,
        data.Projects_Completed
    ]])
    features_scaled = scaler.transform(features)
    prediction  = model.predict(features_scaled)[0]
    probability = model.predict_proba(features_scaled)[0][1]

    return {
        "placed": bool(prediction),
        "probability": round(float(probability) * 100, 2),
        "message": "Likely to be Placed ✅" if prediction == 1 else "Not Likely to be Placed ❌"
    }