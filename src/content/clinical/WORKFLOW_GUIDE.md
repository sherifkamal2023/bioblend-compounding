# Workflow Guide — Running a Clinical Case

*Clinical Pharmacist AI — Compounding & Precision Therapeutics Expert*

## 1. Intake (Step 2 of the Workflow)

Begin every case by collecting the standard patient assessment input defined in Section 20 of the master prompt: age, sex, weight, height, pregnancy/lactation status; diagnoses, symptoms, treatment goals, comorbidities; current medications with doses, routes, and frequencies, supplements, previous therapies, allergies, and adverse reactions; laboratory results (CBC, renal and liver function, electrolytes, disease-specific tests, TDM levels where applicable); and, where compounding is contemplated, the reason for compounding, the required dosage form and route, the target dose, swallowing or administration issues, and excipient restrictions. The intake module validates this structure, normalizes units to metric, and produces an explicit list of **missing data** that the agent must request rather than fabricate. Missing elements are never silently assumed; they are tagged UNKNOWN in the report. Urgent safety guidance is never withheld merely because nonessential data are missing.

## 2. Medication Review and Problem Identification (Step 3)

The medication review engine screens the profile against eighteen problem categories and returns findings prioritized Critical, High, Moderate, or Low. Typical outputs include allergy matches against current medications, renal-dosing flags when creatinine suggests impairment, therapeutic-duplication warnings within the same drug class, sentinel interaction pairs, Beers-criteria flags for patients 65 or older, polypharmacy deprescribing triggers, and formulation-optimization opportunities when swallowing difficulty coexists with oral solid medications. Every finding carries a specific recommendation and a verification status.

## 3. Evidence Assessment and the Compounding Decision (Steps 4–5)

The agent evaluates evidence strictly along the eight-tier hierarchy, from regulatory product information down to lower-level evidence used only when nothing better exists. It then asks the central question of the practice: **does this patient genuinely need a compounded medication?** Compounding is justified only by recognized clinical reasons such as unavailable strengths, dysphagia, pediatric dosing, excipient allergy, or palliative needs — never by commercial attractiveness. When a licensed product adequately meets the need, the agent recommends it instead.

## 4. Formulation Design and Verification (Steps 6–8)

If compounding is necessary, the agent characterizes the API (chemical identity, salt/base form, solubility, stability risks), selects a vehicle and screens every excipient against patient-specific risk factors (neonatal benzyl-alcohol and propylene-glycol risks, paraben and sulfite sensitivity, sodium load in renal disease, carbohydrate content in diabetes, lactose and gluten where relevant), and classifies the formula A through E. Calculations are performed with full transparency — formula, inputs, units, working, result, and an independent reasonableness check — and the high-risk compounding rule is checked automatically. Stability and BUD are separated from one another, and the mandated no-evidence statement is used whenever the evidence is insufficient.

## 5. Safety Gate, Monitoring, and Communication (Steps 9–10)

The seventeen-point safety gate scores the completed report; any unresolved high-risk item stops finalization and flags the case for pharmacist/physician verification. A monitoring plan defines efficacy, safety, laboratory, and clinical endpoints with a follow-up interval. Finally, the agent renders the fifteen-section standard output, adapting register and detail to the audience: physicians receive Problem → Evidence → Recommendation → Monitoring summaries (SBAR when useful); pharmacists receive full formulation, calculation, compatibility, quality-control, and verification-point detail; patients receive plain-language counseling covering purpose, dose, administration, storage, missed doses, precautions, expected benefit, adverse effects, and when to seek help; management receives clinical value, quality, operational, economic, risk, and KPI analysis.

## 6. Scenario JSON Schema

A scenario file passed to `run_agent.py` follows this structure:

```json
{
  "question": "String describing the clinical or formulation question",
  "patient": {
    "age": 7, "sex": "F", "weight": 24, "weight_unit": "kg",
    "height": 122, "height_unit": "cm",
    "pregnancy_lactation": null, "jurisdiction": "United States",
    "diagnoses": ["acute otitis media"],
    "symptoms": ["ear pain", "fever"],
    "treatment_goals": ["resolve infection"],
    "comorbidities": [],
    "medications": [{"name": "amoxicillin", "dose": "suspended (allergy)",
                     "route": "oral", "frequency": null, "indication": null}],
    "supplements": [], "previous_therapies": [],
    "allergies": ["penicillin"], "adverse_reactions": [],
    "labs": [{"test": "Serum creatinine", "value": 0.4, "units": "mg/dL"}],
    "compounding_reason": "cannot swallow tablets",
    "required_form": "oral suspension", "required_route": "oral",
    "target_dose": "weight-based",
    "swallowing_administration_issues": "dysphagia to tablets",
    "excipient_restrictions": []
  },
  "compounding": {
    "api": "azithromycin", "dose": "10 mg/kg day 1, then 5 mg/kg",
    "dosage_form": "oral suspension", "route": "oral",
    "vehicle": "cherry syrup vehicle",
    "excipients": ["sucrose", "xanthan gum", "sodium benzoate"],
    "concentration": "100 mg/5 mL", "packaging": "", "storage": "",
    "formula_source": "published stability literature or compendial monograph",
    "stability_data_available": true, "compendial_source": false,
    "dose_per_kg": 10, "final_volume_ml": 100,
    "target_concentration_mg_ml": 20
  },
  "monitoring": {
    "efficacy_endpoints": ["resolution of fever within 72 h"],
    "safety_endpoints": ["GI tolerance"],
    "laboratory_monitoring": [], "clinical_monitoring": ["daily symptom check"],
    "follow_up_interval": "48-72 h"
  }
}
```

## 7. Interpreting the Report

Every report ends with the Safety Gate summary. A report whose gate displays **STOP** must not be acted upon until the flagged verification items are resolved by a licensed pharmacist or physician. The confidence rating (High/Moderate/Low) and its uncertainty explanation, together with the KNOWN/CALCULATED/INFERRED/UNKNOWN/REQUIRES VERIFICATION labels distributed through the report, tell the reader exactly which parts of the analysis rest on firm evidence and which require professional confirmation.
