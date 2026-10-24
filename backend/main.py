from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List
import pickle
import pandas as pd
import shap

app = FastAPI(title="Project Lucina API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

with open("endocrine_model.pkl", "rb") as f:
    artifact = pickle.load(f)
    model = artifact["model"]
    feature_names = artifact["feature_names"]

explainer = shap.TreeExplainer(model)

class EndocrineInput(BaseModel):
    cycle_length: float = Field(..., example=38.0)
    bmi: float = Field(..., example=27.4)
    lh_fsh_ratio: float = Field(..., example=2.3)
    hirsutism_score: float = Field(..., example=12.0)
    pelvic_pain: float = Field(..., example=7.0)
    insulin_fasting: float = Field(..., example=18.5)

@app.post("/api/triage/endocrine")
def triage_endocrine(data: EndocrineInput):
    df = pd.DataFrame([data.dict()])[feature_names]
    prob = float(model.predict_proba(df)[0][1])
    risk_level = "High" if prob >= 0.65 else "Moderate" if prob >= 0.35 else "Low"

    shap_vals = explainer.shap_values(df)
    vals = shap_vals[1][0] if isinstance(shap_vals, list) else shap_vals[0]

    attributions = [
        {"feature": feat.replace("_", " ").title(), "impact": round(float(val), 3)}
        for feat, val in zip(feature_names, vals)
    ]
    attributions.sort(key=lambda x: abs(x["impact"]), reverse=True)

    return {
        "risk_probability": round(prob * 100, 1),
        "risk_tier": risk_level,
        "primary_drivers": attributions[:4],
        "clinical_guidance": "Recommend targeted pelvic ultrasound and fasting metabolic workup." if prob >= 0.65 else "Symptom tracking within acceptable clinical deviation."
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
