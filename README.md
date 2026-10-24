# Project Lucina: Explainable Clinical Decision Support & Longitudinal Maternal Health Telemetry

Built for **recHERsion 2026** (NITK Surathkal ACM-W) — Track: **Women Healthcare (PS1)**

---

## 1. Proposed Idea

Women's reproductive health currently suffers from a fragmented care model where clinical tools are divided into separate, disconnected silos:
* **The Endocrine Lag:** Over 10% of women worldwide suffer from Polycystic Ovary Syndrome (PCOS) and Endometriosis, yet the average clinical diagnosis takes **7 to 10 years**. Patients endure chronic pelvic pain, irregular bleeding, and progressive metabolic decline while symptoms are repeatedly dismissed as standard menstrual discomfort.
* **The Gestational Crisis Blind Spot:** Preeclampsia and gestational hypertension affect 5–8% of pregnancies globally and remain leading drivers of maternal and fetal mortality. Conventional antenatal care evaluates risk using rigid static blood pressure cutoffs (BP >= 140/90 mmHg), completely missing personalized velocity spikes and sub-threshold vascular resistance shifts until acute clinical deterioration occurs.

### The Innovation
**Project Lucina** introduces an integrated clinical intelligence ecosystem that approaches female reproductive and maternal health as a unified physiological continuum. It comprises three core pillars:
1. **Pre-Conception / Endocrine Stratification Engine:** A multi-feature clinical triage pipeline combining non-invasive biomarker inputs (hormone ratios, metabolic factors) and longitudinal cycle telemetry to predict phenotype risk clusters, paired with transparent Explainable AI (XAI) feature attributions.
2. **Dynamic Gestational Telemetry Engine:** An adaptive time-series anomaly detection engine evaluating Mean Arterial Pressure (MAP) velocity, rolling systolic/diastolic baselines, and acute weight gain/edema progression relative to an individualized baseline.
3. **The Clinician Decision Bridge (FHIR / Doctor Brief):** An automated export pipeline transforming raw telemetry logs into a standardized, one-page clinical summary sheet with actionable diagnostic recommendations for OB-GYNs.

---

## 2. Technical Approach

### 2.1 Tabular Risk Classification & Calibration
* **Algorithm:** Gradient-boosted decision trees implemented via **LightGBM** (`LGBMClassifier`).
* **Objective:** Binary classification and calibrated probability output ($P(\text{Risk} \ge 0.65)$ triggers the high-risk clinical tier; $0.35 \le P < 0.65$ triggers the moderate tier).
* **Feature Schema:**
  * Cycle length variance (Mean = 33, Std = 7 days)
  * Body Mass Index (BMI, kg/m²)
  * Luteinizing Hormone to Follicle-Stimulating Hormone ratio (LH:FSH)
  * Modified Ferriman-Gallwey hirsutism score (0 to 36 scale)
  * Visual Analog Scale (VAS) pelvic pain severity (1 to 10)
  * Fasting insulin level (μIU/mL)

### 2.2 Explainable AI (XAI) via TreeSHAP
* **Mathematical Foundation:** Rather than presenting an untrusted "black-box" risk score, the platform uses Shapley Additive Explanations (SHAP) to quantify local feature attributions.
* **TreeExplainer Integration:** Returns exact feature contribution vectors for every individual patient intake. The top positive risk drivers are dynamically extracted and rendered on the client dashboard so doctors understand exactly why a risk score is high.

### 2.3 Longitudinal Bayesian Gestational Telemetry
* **Mean Arterial Pressure (MAP) Formula:**
  $$\text{MAP} = \frac{\text{Systolic} + 2 \times \text{Diastolic}}{3}$$
* **Dynamic Delta Thresholding:** Triggers an alert when:
  $$\Delta \text{MAP} = \text{MAP}_{\text{current}} - \text{MAP}_{\text{baseline}} \ge 15\text{ mmHg}$$
* **Multivariate Crisis Alerts:**
  * Clinical Stage 1 violation: Systolic >= 140 mmHg or Diastolic >= 90 mmHg.
  * Edema velocity anomaly: Weight delta >= 1.4 kg in a single 2-week monitoring window.
  * Biochemical biomarker trigger: Presence of dipstick proteinuria (+1 or higher).

---

## 3. System Architecture

```text
                               ┌────────────────────────────────────────────────────────┐
                               │                    PATIENT INTERFACE                   │
                               │        React 18 + Vite | Tailwind CSS | Recharts       │
                               └───────────────────────────┬────────────────────────────┘
                                                           │
                                        JSON over REST API │ HTTPS
                                                           ▼
                               ┌────────────────────────────────────────────────────────┐
                               │                 FASTAPI ENGINE SERVICE                 │
                               │           Pydantic Validation & Route Handlers         │
                               └─────────────┬────────────────────────────┬─────────────┘
                                             │                            │
                                             ▼                            ▼
                 ┌──────────────────────────────────────┐     ┌──────────────────────────────────────┐
                 │     ENDOCRINE TRIAGING PIPELINE      │     │    GESTATIONAL TELEMETRY PIPELINE    │
                 │  • LightGBM Decision Classifier      │     │  • MAP Dynamic Baseline Delta        │
                 │  • TreeSHAP Feature Attribution      │     │  • Edema / Proteinuria Detectors     │
                 │  • Phenotype Severity Mapping        │     │  • Hypertensive Crisis Scoring       │
                 └───────────────────┬──────────────────┘     └───────────────────┬──────────────────┘
                                     │                                            │
                                     └─────────────────────┬──────────────────────┘
                                                           ▼
                               ┌────────────────────────────────────────────────────────┐
                               │              CLINICAL EXPORT & SUMMARY                 │
                               │        • Single-Page Clinician Brief Generator         │
                               │        • FHIR-Aligned Output Payload                   │
                               │        • Targeted OB-GYN Lab Recommendations          │
                               └────────────────────────────────────────────────────────┘
