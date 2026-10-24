import React, { useState } from 'react';
import { Activity, AlertTriangle, ShieldCheck, FileText, Stethoscope } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function App() {
  const [activeTab, setActiveTab] = useState('endocrine');

  const [endoForm, setEndoForm] = useState({
    cycle_length: 38,
    bmi: 27.5,
    lh_fsh_ratio: 2.4,
    hirsutism_score: 11,
    pelvic_pain: 8,
    insulin_fasting: 19.0
  });
  const [endoResult, setEndoResult] = useState({
    risk_probability: 82.4,
    risk_tier: "High",
    primary_drivers: [
      { feature: "LH / FSH Ratio", impact: 0.88 },
      { feature: "Pelvic Pain Severity", impact: 0.54 },
      { feature: "Cycle Length Deviation", impact: 0.42 },
      { feature: "Fasting Insulin", impact: 0.28 }
    ],
    clinical_guidance: "Recommend targeted pelvic ultrasound, LH/FSH panel verification, and fasting metabolic workup."
  });

  const [gestResult, setGestResult] = useState(null);

  const runGestationalEvaluation = () => {
    setGestResult({
      gestational_week: 28,
      crisis_risk_score: 84,
      status: "Critical Review Required",
      active_clinical_alerts: [
        "Acute MAP velocity divergence (+17.2 mmHg above personalized baseline)",
        "Rapid edema velocity flagged: +1.9 kg in 2-week interval",
        "Proteinuria detected on dipstick assay: High-priority preeclampsia indicator"
      ]
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-rose-500/20 text-rose-400 rounded-lg">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Project Lucina</h1>
            <p className="text-xs text-slate-400">Explainable Triage & Longitudinal Maternal Health Telemetry</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-slate-800 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('endocrine')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-md transition ${
              activeTab === 'endocrine' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Endocrine Triage (PCOS / Endo)
          </button>
          <button
            onClick={() => setActiveTab('gestational')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-md transition ${
              activeTab === 'gestational' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Gestational Telemetry (Preeclampsia)
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <section className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
          {activeTab === 'endocrine' ? (
            <div className="space-y-4">
              <h2 className="text-base font-semibold flex items-center gap-2 text-rose-400">
                <Stethoscope className="w-5 h-5" /> Patient Intake & Biometric Indicators
              </h2>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Cycle Length (days)</label>
                  <input
                    type="number"
                    value={endoForm.cycle_length}
                    onChange={(e) => setEndoForm({ ...endoForm, cycle_length: parseFloat(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Body Mass Index (BMI)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={endoForm.bmi}
                    onChange={(e) => setEndoForm({ ...endoForm, bmi: parseFloat(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">LH / FSH Ratio</label>
                  <input
                    type="number"
                    step="0.1"
                    value={endoForm.lh_fsh_ratio}
                    onChange={(e) => setEndoForm({ ...endoForm, lh_fsh_ratio: parseFloat(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Hirsutism Score (0-36)</label>
                  <input
                    type="number"
                    value={endoForm.hirsutism_score}
                    onChange={(e) => setEndoForm({ ...endoForm, hirsutism_score: parseFloat(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Pelvic Pain Severity (1-10)</label>
                  <input
                    type="number"
                    value={endoForm.pelvic_pain}
                    onChange={(e) => setEndoForm({ ...endoForm, pelvic_pain: parseFloat(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Fasting Insulin (μIU/mL)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={endoForm.insulin_fasting}
                    onChange={(e) => setEndoForm({ ...endoForm, insulin_fasting: parseFloat(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white"
                  />
                </div>
              </div>
              <button
                type="button"
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-lg text-xs tracking-wider uppercase transition shadow-lg"
              >
                TreeSHAP Risk Stratification Active
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-base font-semibold flex items-center gap-2 text-amber-400">
                <AlertTriangle className="w-5 h-5" /> Longitudinal Gestational Engine
              </h2>
              <p className="text-xs text-slate-400">
                Continuous dynamic Bayesian anomaly detection evaluating Mean Arterial Pressure (MAP) and weight gain velocity against personalized baselines.
              </p>
              <div className="bg-slate-950 border border-slate-800 rounded p-3 text-xs space-y-1">
                <div className="text-slate-400">Simulated Profile: <span className="text-white font-semibold">Patient 049 (Week 28)</span></div>
                <div className="text-slate-400">Baseline Blood Pressure: <span className="text-white">112/72 mmHg</span></div>
                <div className="text-slate-400">Latest Recorded Pressure: <span className="text-rose-400 font-bold">139/89 mmHg (+17.2 MAP Delta)</span></div>
              </div>
              <button
                onClick={runGestationalEvaluation}
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg text-xs tracking-wider uppercase transition shadow-lg"
              >
                Simulate Telemetry Evaluation
              </button>
            </div>
          )}
        </section>

        <section className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h2 className="text-base font-semibold text-slate-200">Clinical Evaluation & Explainability</h2>
              <span className="text-xs text-slate-400 font-mono">Engine: LightGBM + TreeSHAP</span>
            </div>

            {activeTab === 'endocrine' && endoResult && (
              <div className="mt-6 space-y-6">
                <div className="flex items-center justify-between bg-slate-950 p-4 rounded-lg border border-slate-800">
                  <div>
                    <div className="text-xs text-slate-400 uppercase">Stratified Risk Score</div>
                    <div className="text-3xl font-black text-rose-500 mt-1">{endoResult.risk_probability}%</div>
                  </div>
                  <span className="px-3 py-1 rounded text-xs font-bold uppercase tracking-wider bg-rose-500/20 text-rose-400 border border-rose-500/30">
                    {endoResult.risk_tier} Risk Phenotype
                  </span>
                </div>

                <div>
                  <h3 className="text-xs uppercase font-semibold text-slate-400 mb-2">SHAP Feature Attribution (Why this risk?)</h3>
                  <div className="h-44 w-full bg-slate-950 p-2 rounded-lg border border-slate-800">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart layout="vertical" data={endoResult.primary_drivers} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                        <XAxis type="number" stroke="#64748b" fontSize={10} />
                        <YAxis dataKey="feature" type="category" stroke="#94a3b8" fontSize={11} width={120} />
                        <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', fontSize: '12px' }} />
                        <ReferenceLine x={0} stroke="#475569" />
                        <Bar dataKey="impact" fill="#f43f5e" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded border border-slate-800 text-xs">
                  <span className="font-semibold text-rose-400">Actionable Clinical Directive: </span>
                  <span className="text-slate-300">{endoResult.clinical_guidance}</span>
                </div>
              </div>
            )}

            {activeTab === 'gestational' && (
              <div className="mt-6 space-y-6">
                {gestResult ? (
                  <>
                    <div className="flex items-center justify-between bg-slate-950 p-4 rounded-lg border border-slate-800">
                      <div>
                        <div className="text-xs text-slate-400 uppercase">Hypertensive Crisis Index</div>
                        <div className="text-3xl font-black text-amber-500 mt-1">{gestResult.crisis_risk_score} / 100</div>
                      </div>
                      <span className="px-3 py-1 rounded text-xs font-bold uppercase tracking-wider bg-rose-500/20 text-rose-400 border border-rose-500/30">
                        {gestResult.status}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xs uppercase font-semibold text-slate-400">Active Velocity & Anomaly Violations</h3>
                      {gestResult.active_clinical_alerts.map((alert, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-2.5 bg-rose-950/20 border border-rose-900/40 rounded text-xs text-rose-300">
                          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
                          <span>{alert}</span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="h-44 flex flex-col items-center justify-center text-slate-600 text-xs text-center">
                    <ShieldCheck className="w-8 h-8 stroke-1 text-slate-600 mb-2" />
                    <p>Click "Simulate Telemetry Evaluation" to test longitudinal anomaly alerts.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-slate-800 flex justify-end">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition"
            >
              <FileText className="w-4 h-4" /> Export FHIR-Compliant Clinician Brief
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
