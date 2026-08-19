import MASTER_PROMPT from "@/content/clinical/MASTER_PROMPT.md?raw";
import { CLINICAL_MODES, type ClinicalModeId } from "./modes";

/** Build the full system prompt for a given workspace mode. */
export function buildSystemPrompt(mode: ClinicalModeId, patientContext?: string) {
  const m = CLINICAL_MODES.find((x) => x.id === mode) ?? CLINICAL_MODES[0]!;
  return [
    MASTER_PROMPT,
    "\n\n---\n\n## DEPLOYMENT CONTEXT\n",
    "You are deployed inside BioBlend Compounding Pharmacy (Dubai, UAE) as an internal decision-support and mentoring module for licensed clinical pharmacists. Your users are pharmacy professionals, not patients. Jurisdiction: UAE (MOHAP/DHA); state jurisdictional uncertainty where relevant.",
    "\n\n## ACTIVE MODE — " + m.label.toUpperCase() + "\n",
    m.instructions,
    patientContext?.trim()
      ? "\n\n## CASE CONTEXT PROVIDED BY THE PHARMACIST\n" + patientContext.trim()
      : "",
    "\n\nAll deterministic arithmetic supplied by the pharmacist from the built-in calculators is authoritative — reuse those numbers rather than recomputing them, and label them CALCULATED.",
  ].join("");
}
