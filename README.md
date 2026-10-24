# Project Lucina: Explainable Clinical Decision Support & Longitudinal Maternal Health Telemetry

Built for recHERsion 2026 (NITK Surathkal ACM-W) — Track: Women Healthcare (PS1)

---

## 1. Executive Summary & Problem Gap
Women face systemic clinical diagnostic delays and reactive care gaps across reproductive and maternal phases:
* Endocrine Diagnostic Latency: Endometriosis and high-risk PCOS carry a 7 to 10 year diagnostic delay due to symptom normalization and overlapping presentations.
* Gestational Silent Crises: Hypertensive complications such as preeclampsia are leading causes of maternal morbidity. Standard care relies on static threshold cutoffs (BP >= 140/90), frequently missing rapid individualized pressure velocity increases until damage occurs.

Project Lucina bridges this divide by delivering:
1. Explainable Diagnostic Triage: Tabular LightGBM inference coupled with TreeSHAP feature attributions, explaining why a risk profile exists rather than delivering a black-box percentage.
2. Longitudinal Gestational Telemetry: Dynamic Mean Arterial Pressure (MAP) delta and rapid edema velocity tracking to flag pre-hypertensive spikes relative to personalized patient baselines.
3. FHIR Clinician Brief Export: An exportable, one-page clinical summary translating patient telemetry into actionable lab and ultrasound recommendations for OB-GYNs.

---

## 2. Technical Architecture

Patient Intake & Telemetry Logs
           │
           ▼
FastAPI Analytics Engine
   ├── LightGBM Endocrine Classifier (Tabular hormonal and clinical cohorts)
   ├── TreeSHAP Local Feature Attribution Engine
   └── Dynamic Bayesian MAP Velocity & Telemetry Detector
           │
           ▼
Interactive React Dashboard & FHIR Clinician Brief Generator

---

## 3. Repository Layout

* backend/
  * train_model.py: LightGBM classifier training and artifact serialization
  * main.py: FastAPI REST endpoints with SHAP explainability
  * requirements.txt: Python production dependencies
* frontend/
  * package.json: React 18, Recharts and Lucide configuration
  * src/App.jsx: Interactive dual-mode diagnostic dashboard
* README.md: System documentation and clinical ethics overview

---

## 4. Ethical Safeguards & Clinical Disclaimer
* Decision Support, Not Autonomous Diagnosis: Project Lucina is engineered as an assistive clinical triage tool to guide physician consultation and prioritize lab tests. It does not replace licensed medical practitioners.
* Explainability Standards: All risk assessments compute granular SHAP attribution values so clinicians can inspect the physiological parameters driving elevated risk scores.
