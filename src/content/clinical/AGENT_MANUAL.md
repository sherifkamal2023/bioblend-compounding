# Clinical Pharmacist AI — Agent Manual

**Compounding & Precision Therapeutics Expert**

*Author: Manus AI · Version 1.0*

---

## 1. Purpose and Scope

The Clinical Pharmacist AI is an advanced decision-support agent that functions as a senior clinical pharmacist, pharmacotherapy specialist, medication-safety expert, and compounding-pharmacy decision-support system. Its purpose is to integrate the full pipeline of **Patient → Diagnosis → Therapeutic Goal → Medication Assessment → Evidence → Personalized Formulation → Compounding Feasibility → Quality/Safety Assessment → Monitoring → Follow-up** into a single, disciplined, auditable workflow.

The agent is explicitly **not an autonomous prescriber**. Every output it generates is decision-support material that must be verified by a licensed pharmacist and/or physician before any clinical action is taken. This boundary is enforced through the classification system (Section 5 of this manual), the 16-point Safety Gate (Section 7), and the High-Risk Compounding Rule (Section 8), and it is hardcoded into the agent's master prompt and software engine alike.

The professional behavior of the agent is grounded in the **ACCP Clinical Pharmacist Competencies** published by Saseen and colleagues in *Pharmacotherapy* (2017), whose six domains — direct patient care, health systems and population, practice management, informatics and technology, leadership, and education and research — are operationalized throughout every workflow [1].

## 2. Package Contents

| Path | Component | Function |
|---|---|---|
| `prompt/MASTER_PROMPT.md` | Master system prompt | The complete operational instruction set (25 sections) for the LLM agent |
| `engine/` | Decision-support engine | Deterministic Python modules for calculations, classification, review, and safety gating |
| `engine/calculations.py` | Calculation engine | Verified compounding mathematics with unit-explicit records |
| `engine/bsa.py` | Physiology calculations | Renal function (Cockcroft-Gault, CKD-EPI 2021, Schwartz), BSA, IBW/ABW |
| `engine/formulation.py` | Formulation assessment | A–E evidence classification, excipient risk screening, stability/BUD framework |
| `engine/medication_review.py` | Medication review engine | Structured review across 18 drug-related-problem categories |
| `engine/safety_gate.py` | Safety gate | 16-point verification with automatic STOP-and-flag |
| `engine/knowledge.py` | Knowledge framework | Evidence hierarchy, authoritative registry, hallucination-control labels |
| `engine/patient_assessment.py` | Patient intake | Standardized intake validation and gap identification |
| `agent/run_agent.py` | Agent orchestrator | Executes the 10-step workflow; supports scenario JSON, demo, and interactive modes |
| `docs/` | Documentation | This manual, workflow guide, and reference frameworks |

## 3. Architecture: Four Interconnected Layers

The agent thinks across four layers in strict order, as specified in Section 25 of the master prompt. The **Clinical Layer** asks what is best for this patient. The **Pharmacotherapy Layer** determines the medication strategy that best achieves the therapeutic objective. The **Compounding Layer** addresses how an individualized formulation, if genuinely needed, can be prepared safely and appropriately. The **Quality and Governance Layer** verifies whether the preparation can be produced, verified, monitored, and used within applicable professional and regulatory standards.

The final objective of every case is the eight-part alignment:

> **Right Patient + Right Therapy + Right Formulation + Right Dose + Right Route + Right Quality + Right Monitoring + Right Evidence**

## 4. The Ten-Step Clinical Workflow

The required clinical workflow is implemented identically in the master prompt (Section 19) and in `run_agent.py`, which executes the steps as `step1_define_question` through `step10_render`. The sequence is: define the question; collect information; identify drug-related problems; assess evidence; determine whether compounding is needed; design or verify the therapeutic plan; run the safety check; run the compounding check; define monitoring; and communicate the result to the appropriate audience. Step 10 adapts the output format automatically to the intended audience (physician, pharmacist, patient, or management) using the communication rules in Section 16 of the master prompt.

## 5. Information Classification (Hallucination Control)

Every substantive statement produced by the agent carries one of five derivation labels, which together constitute its anti-fabrication system:

| Label | Meaning | Example |
|---|---|---|
| **KNOWN** | Supported by authoritative evidence or provided as input | "FDA labeling for azithromycin states..." |
| **CALCULATED** | Mathematically derived; formula, inputs, and units shown | "24 kg × 10 mg/kg = 240 mg" |
| **INFERRED** | Reasonable interpretation with the assumption stated | "INFERRED: presumed normal hepatic function" |
| **UNKNOWN** | Information not available | "UNKNOWN: no stability data available for this vehicle" |
| **REQUIRES VERIFICATION** | Requires pharmacist/physician confirmation | "REQUIRES VERIFICATION: confirm lot COA" |

The agent is forbidden from fabricating formulations, references, clinical trials, stability studies, BUDs, compatibility data, regulatory approvals, doses, laboratory values, or patient information. The knowledge module's curated authoritative registry (`AUTHORITATIVE_REGISTRY` in `engine/knowledge.py`) enumerates the source classes the agent may cite, spanning regulatory labels, clinical guidelines, pharmacopeial standards, systematic reviews, and compounding references such as Allen's compounding text and the *International Journal of Pharmaceutical Compounding*.

## 6. Formulation Evidence Classification (A–E)

Before presenting any formulation, the engine classifies it into exactly one evidence tier:

| Class | Definition | Agent behavior |
|---|---|---|
| **A — Validated/Compendial** | A recognized pharmacopeial or validated formulation exists | Present with the compendial source |
| **B — Published** | Supported by published stability/formulation literature | Present with the literature citation |
| **C — Institutionally Established** | Credible institutional procedures, not necessarily compendial | Present, flagged as non-compendial |
| **D — Literature-Informed** | Scientifically plausible but requires validation | Present only with explicit validation requirements |
| **E — Insufficient Evidence** | Cannot responsibly recommend | Decline to formulate |

The classifier in `formulation.py` (`classify_formulation`) never assigns a higher class than the supplied evidence supports, and an absent formula source always yields Class E.

## 7. The Safety Gate

Before any patient-specific recommendation is finalized, the agent internally verifies seventeen checkpoints (correct patient, indication, drug, dose, dosage form, route, concentration, calculation, organ-function adjustment, interactions, contraindications, allergy/excipient risk, formula support, stability support, BUD support, packaging, monitoring, and regulatory uncertainty identification). The `safety_gate` function in `engine/safety_gate.py` scores each checkpoint, and if any high-risk issue remains unresolved, the gate sets a **STOP flag**: the recommendation is not finalized and is instead flagged for pharmacist/physician verification. The checkpoint results appear at the end of every report.

## 8. High-Risk Compounding Rule

Eleven categories of preparations trigger enhanced safeguards: sterile products, hazardous drugs, pediatric/neonatal formulations, narrow therapeutic index medications, high-alert medications, intrathecal/epidural preparations, ophthalmic preparations, parenteral nutrition, concentrated electrolytes, potent hormones, and cytotoxic preparations. For these, the agent provides **decision support only** and never generates production-ready instructions when essential validation, sterility, compatibility, concentration, regulatory, or patient-safety information is missing. The rule is implemented in `is_high_risk()` and `high_risk_disclaimer()` in the formulation module, and a detected trigger automatically lowers the report confidence and activates the safety-gate stop condition.

## 9. Beyond-Use Dates

The engine strictly separates chemical stability, physical stability, microbiological stability, and the beyond-use date. It never invents a BUD. When authoritative evidence is unavailable, the mandated statement is emitted verbatim:

> "A validated beyond-use date cannot be established from the available evidence. Pharmacist verification and applicable compounding standards are required."

When evidence does exist, the engine presents the USP <795> default BUD framework (14 days refrigerated for nonsterile aqueous preparations; the earlier of remaining API expiry or six months for non-aqueous preparations) with a REQUIRES VERIFICATION tag, directing the pharmacist to the primary source [2].

## 10. Compounding Calculations

The calculation engine is fully deterministic. It provides verified implementations of percentage-strength conversions, ratio-strength conversions, batch-quantity totals, quantity-for-volume computations, C1V1 = C2V2 dilutions, dose-volume conversions, the aliquot method, salt-to-base and molecular-weight conversions, potency correction, displacement-volume estimates, theoretical osmolarity, infusion concentration, Mosteller BSA with DuBois cross-check, BSA-based dosing, weight-based pediatric dosing with optional maximum-dose caps, and ideal/adjusted body weight. Every result returns a structured record containing the formula, inputs, units, working, result, and an independent reasonableness check (typically a reverse calculation). Missing units raise `UnknownQuantityError` rather than being silently assumed, which enforces the rule that the agent never silently assumes missing units.

## 11. Structured Medication Review

Given a patient profile, `review_medications()` in the medication-review engine screens for all eighteen problem categories, including untreated indications, therapeutic duplication, renal and hepatic dosing issues, drug interactions (a sentinel pair library covering warfarin-aspirin, simvastatin-amlodipine, lithium-ibuprofen, clopidogrel-omeprazole, and others), allergy matches, Beers-criteria flags for patients aged 65 and over, polypharmacy deprescribing triggers at five or more concurrent medications, monitoring gaps for drugs requiring therapeutic drug monitoring, and formulation-optimization opportunities when swallowing difficulty and excipient restrictions are present. Every finding is classified Critical, High, Moderate, or Low and presented in priority order, each carrying its own verification recommendation.

## 12. Professionalism and Ethics

The agent enforces the priority ordering **Patient Welfare > Scientific Accuracy > Medication Safety > Regulatory Compliance > Operational Convenience > Commercial Interest**. It never alters a recommendation because a product has higher profit potential, and it explicitly identifies conflicts between patient benefit and commercial objectives — this rule responds directly to the master prompt's warning against compounding recommendations motivated by commercial attractiveness. Patient confidentiality is protected, and the agent never fabricates patient information.

## 13. Using the Agent

The orchestrator runs in three modes. The command `python3 run_agent.py --demo` executes a built-in demonstration case. The command `python3 run_agent.py scenario.json` executes any JSON scenario following the intake schema described in Section 20 of the master prompt. The command `python3 run_agent.py --interactive` runs a guided conversational intake. Large-language-model deployments use `prompt/MASTER_PROMPT.md` as the system prompt and may call the engine modules through a function-calling layer so that every calculation and classification is deterministic rather than generated textually.

## 14. Validation

The engine is validated by the test suite in `test/test_engine.py`, which asserts exact numerical results for the calculation engine (percentage conversions, dilutions, aliquots, salt-base conversions, renal function equations, BSA), verifies that the evidence classifier never over-claims (no source yields Class A or B without matching evidence), verifies that missing inputs raise errors instead of returning assumed values, verifies that the safety gate flags unresolved checkpoints, and verifies that high-risk triggers activate the stop rule. All tests must pass before the agent is relied upon in any workflow.

## 15. Limitations

The agent is a decision-support system. Its knowledge registry catalogs source *classes* and screening rules; drug-specific dosing, compatibility matrices, and stability data must still be verified against primary sources such as FDA/EMA labels, USP chapters, and peer-reviewed literature. The agent cannot perform physical laboratory verification, cannot assume legal responsibility, and its outputs never replace the judgment of licensed professionals. Regulatory assessments are jurisdiction-dependent, and the agent requests the dispensing country whenever regulatory permissibility is at issue.

## References

[1]: https://accp1.onlinelibrary.wiley.com/doi/10.1002/phar.1892 "Saseen JJ, Ripley TL, Bondi D, Burke JM, Cohen LJ, McBane SE, et al. ACCP Clinical Pharmacist Competencies. Pharmacotherapy. 2017;37(5):516-523."

[2]: https://www.usp.org/compounding "United States Pharmacopeial Convention. USP General Chapters <795> Pharmaceutical Compounding—Nonsterile Preparations; <797> Pharmaceutical Compounding—Sterile Preparations; <800> Hazardous Drugs—Handling in Healthcare Settings."
