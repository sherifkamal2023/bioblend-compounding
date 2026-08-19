export type ClinicalModeId =
  | "mentoring"
  | "order_review"
  | "treatment_plan"
  | "care_plan"
  | "follow_up"
  | "formulation";

export type ClinicalMode = {
  id: ClinicalModeId;
  label: string;
  blurb: string;
  placeholder: string;
  instructions: string;
};

export const CLINICAL_MODES: ClinicalMode[] = [
  {
    id: "mentoring",
    label: "Training & mentoring",
    blurb: "Teach, quiz and explain clinical reasoning step by step.",
    placeholder:
      "e.g. Walk me through how to approach a paediatric oral suspension request for an unlicensed strength.",
    instructions:
      "Act as a clinical preceptor. Teach the reasoning, not just the answer: state the principle, work an example, then check understanding with 2–3 targeted questions. Cite the framework or guideline family you are drawing on and label every claim (KNOWN / CALCULATED / INFERRED / UNKNOWN / REQUIRES VERIFICATION). The 15-section case format is not required in this mode unless the pharmacist presents a real case.",
  },
  {
    id: "order_review",
    label: "Order review",
    blurb: "Verify a prescription or compounding order before dispensing.",
    placeholder:
      "Paste the order: drug, strength, dosage form, route, frequency, quantity, patient factors, allergies, current meds.",
    instructions:
      "Perform a full prescription/compounding order verification. Run the safety gate (all 17 checkpoints) explicitly and show the result. Prioritise medication-related problems Critical → High → Moderate → Low. Use the 15-section standard output format. If any high-risk item is unresolved, STOP and flag it for pharmacist/physician verification instead of finalising.",
  },
  {
    id: "treatment_plan",
    label: "Treatment plan",
    blurb: "Design or critique a pharmacotherapy plan for a case.",
    placeholder:
      "Describe the patient: demographics, diagnoses, goals, current therapy, labs, renal/hepatic function.",
    instructions:
      "Execute the 10-step clinical workflow and return the 15-section standard output format. Prefer a licensed commercial product where it adequately meets the clinical need; justify compounding only when clinically necessary.",
  },
  {
    id: "care_plan",
    label: "Pharmaceutical care plan",
    blurb: "Build a documented care plan with goals and monitoring.",
    placeholder:
      "Describe the patient and the therapy under review, plus the desired therapeutic outcomes.",
    instructions:
      "Produce a documented pharmaceutical care plan: assessment, prioritised drug-related problems, therapeutic goals with measurable endpoints, interventions and responsible party, monitoring parameters with frequency, patient counselling points, and a defined follow-up interval. Use the 15-section format and finish with an explicit follow-up date recommendation.",
  },
  {
    id: "follow_up",
    label: "Follow-up review",
    blurb: "Reassess an existing plan against outcomes to date.",
    placeholder:
      "Summarise what has changed since the last review: response, adverse effects, new labs, adherence.",
    instructions:
      "Reassess the existing plan against reported outcomes. State clearly what improved, what did not, and what is still UNKNOWN. Recommend continue / adjust / stop for each therapy with the reason, and revise the monitoring plan and next follow-up interval.",
  },
  {
    id: "formulation",
    label: "Formulation & compounding",
    blurb: "Formula evidence, stability, BUD and preparation review.",
    placeholder:
      "Describe the required formulation: API, target strength, dosage form, vehicle, volume, patient constraints.",
    instructions:
      "Focus on the compounding layer: formula evidence classification (A–E) with the source, ingredient and vehicle rationale, compatibility, stability, packaging, storage and BUD. Where stability or BUD evidence is insufficient, say so explicitly rather than estimating. For high-risk categories (sterile, hazardous, paediatric/neonatal, NTI, high-alert, intrathecal, ophthalmic, PN, concentrated electrolytes, potent hormones, cytotoxics) provide decision support only — never production-ready instructions when essential validation data is missing.",
  },
];
