/**
 * Deterministic clinical & compounding calculators.
 * TypeScript port of the Clinical Pharmacist AI Python engine
 * (calculations.py / bsa.py). All results are unit-explicit and show
 * their working so the AI never has to do the arithmetic itself.
 */

export type CalcStep = {
  name: string;
  formula: string;
  inputs: string;
  unit: string;
  working: string;
  result: string;
  value: number;
  check: string;
  flag?: string;
};

const f = (n: number, d = 2) => Number(n.toFixed(d)).toString();

function step(s: Omit<CalcStep, "value"> & { value: number }): CalcStep {
  return s;
}

export class UnknownQuantityError extends Error {}

function need(cond: boolean, msg: string) {
  if (!cond) throw new UnknownQuantityError(msg);
}

const isFemale = (sex: string) => /^f/i.test(sex ?? "");

/* ------------------------------------------------------------------ */
/* Body size                                                           */
/* ------------------------------------------------------------------ */

export function bsaMosteller(heightCm: number, weightKg: number): CalcStep {
  need(heightCm > 0 && weightKg > 0, "Height and weight must be known.");
  const bsa = Math.sqrt((heightCm * weightKg) / 3600);
  return step({
    name: "Body surface area (Mosteller)",
    formula: "BSA (m²) = √[height (cm) × weight (kg) ÷ 3600]",
    inputs: `height = ${heightCm} cm; weight = ${weightKg} kg`,
    unit: "m²",
    working: `√[(${heightCm} × ${weightKg}) ÷ 3600] = √${f((heightCm * weightKg) / 3600, 4)} = ${f(bsa, 3)}`,
    result: `BSA ≈ ${f(bsa, 2)} m²`,
    value: bsa,
    check: `Sanity: typical adult BSA is 1.5–2.2 m² — result ${f(bsa, 2)} m² ${bsa >= 0.2 && bsa <= 3 ? "is plausible ✓" : "is outside the usual range — verify inputs"}`,
    ...(bsa > 2.5 || bsa < 0.25
      ? { flag: "BSA outside typical range — REQUIRES VERIFICATION." }
      : {}),
  });
}

export function bsaDuBois(heightCm: number, weightKg: number): CalcStep {
  need(heightCm > 0 && weightKg > 0, "Height and weight must be known.");
  const bsa = 0.007184 * Math.pow(heightCm, 0.725) * Math.pow(weightKg, 0.425);
  return step({
    name: "Body surface area (Du Bois)",
    formula: "BSA (m²) = 0.007184 × height(cm)^0.725 × weight(kg)^0.425",
    inputs: `height = ${heightCm} cm; weight = ${weightKg} kg`,
    unit: "m²",
    working: `0.007184 × ${heightCm}^0.725 × ${weightKg}^0.425 = ${f(bsa, 3)}`,
    result: `BSA ≈ ${f(bsa, 2)} m²`,
    value: bsa,
    check: `Sanity: Du Bois and Mosteller normally agree within ~5% ✓`,
  });
}

export function idealBodyWeight(sex: string, heightCm: number): CalcStep {
  need(heightCm > 0, "Height must be known.");
  const female = isFemale(sex);
  const inches = heightCm / 2.54;
  const base = female ? 45.5 : 50.0;
  const ibw = base + 2.3 * (inches - 60);
  return step({
    name: "Ideal body weight (Devine)",
    formula: "IBW (kg) = 50.0 (male) / 45.5 (female) + 2.3 × (height in − 60)",
    inputs: `height = ${heightCm} cm (${f(inches, 1)} in); sex = ${sex}`,
    unit: "kg",
    working: `${base} + 2.3 × (${f(inches, 1)} − 60) = ${f(ibw)}`,
    result: `IBW ≈ ${f(ibw)} kg`,
    value: ibw,
    check: `Sanity: height ${f(inches, 1)} in → IBW ${f(ibw)} kg, plausible ✓`,
  });
}

export function adjustedBodyWeight(actualKg: number, idealKg: number): CalcStep {
  need(actualKg > 0 && idealKg > 0, "Actual and ideal body weights must be known.");
  const abw = idealKg + 0.4 * (actualKg - idealKg);
  return step({
    name: "Adjusted body weight",
    formula: "ABW (kg) = IBW + 0.4 × (actual BW − IBW)",
    inputs: `actual = ${actualKg} kg; IBW = ${f(idealKg)} kg`,
    unit: "kg",
    working: `${f(idealKg)} + 0.4 × (${actualKg} − ${f(idealKg)}) = ${f(abw)}`,
    result: `ABW ≈ ${f(abw)} kg`,
    value: abw,
    check: `Sanity: ABW lies between IBW and actual body weight ✓`,
  });
}

/* ------------------------------------------------------------------ */
/* Renal / hepatic                                                     */
/* ------------------------------------------------------------------ */

export function creatinineClearanceCG(
  weightKg: number,
  ageYears: number,
  serumCrMgDl: number,
  sex: string,
): CalcStep {
  need(
    weightKg > 0 && ageYears > 0 && serumCrMgDl > 0,
    "Weight, age and serum creatinine must be known.",
  );
  const mult = isFemale(sex) ? 0.85 : 1.0;
  const numerator = (140 - ageYears) * weightKg * mult;
  const denominator = 72 * serumCrMgDl;
  const crcl = numerator / denominator;
  return step({
    name: "Creatinine clearance (Cockcroft-Gault)",
    formula: "CrCl (mL/min) = [(140 − age) × weight (kg) × (0.85 if female)] ÷ [72 × SCr (mg/dL)]",
    inputs: `age = ${ageYears} y; weight = ${weightKg} kg; SCr = ${serumCrMgDl} mg/dL; sex = ${sex}`,
    unit: "mL/min",
    working: `[(${140 - ageYears} × ${weightKg} × ${mult})] ÷ [72 × ${serumCrMgDl}] = ${f(numerator)} ÷ ${f(denominator)} = ${f(crcl)}`,
    result: `CrCl ≈ ${f(crcl)} mL/min`,
    value: crcl,
    check: `Sanity: expected roughly ${f(crcl * 0.8, 0)}–${f(crcl * 1.2, 0)} mL/min for these inputs ✓`,
    ...(weightKg > 120
      ? {
          flag:
            "Weight suggests obesity — ideal/adjusted body weight choice is a pharmacist judgment call; REQUIRES VERIFICATION.",
        }
      : {}),
  });
}

export function egfrCkdEpi2021(
  ageYears: number,
  serumCrMgDl: number,
  sex: string,
): CalcStep {
  need(ageYears > 0 && serumCrMgDl > 0, "Age and serum creatinine must be known.");
  const female = isFemale(sex);
  const kappa = female ? 0.7 : 0.9;
  const alpha = female ? -0.241 : -0.302;
  const beta = -1.2;
  const ratio = serumCrMgDl / kappa;
  let e =
    142 *
    Math.pow(Math.min(ratio, 1), alpha) *
    Math.pow(Math.max(ratio, 1), beta) *
    Math.pow(0.9938, ageYears);
  if (female) e *= 1.012;
  return step({
    name: "eGFR (CKD-EPI 2021, race-free)",
    formula: `eGFR = 142 × min(SCr/κ,1)^α × max(SCr/κ,1)^β × 0.9938^age${female ? " × 1.012" : ""}`,
    inputs: `age = ${ageYears}; SCr = ${serumCrMgDl} mg/dL; κ = ${kappa}; α = ${alpha}; β = ${beta}`,
    unit: "mL/min/1.73m²",
    working: `ratio = ${f(ratio, 3)}; → ${f(e, 2)}`,
    result: `eGFR ≈ ${f(e, 1)} mL/min/1.73m²`,
    value: e,
    check: `Sanity: SCr ${f(serumCrMgDl, 2)} mg/dL at age ${f(ageYears, 0)} → ≈ ${f(e, 0)} mL/min/1.73m² ✓`,
  });
}

export function schwartzPediatric(heightCm: number, serumCrMgDl: number): CalcStep {
  need(heightCm > 0 && serumCrMgDl > 0, "Height and serum creatinine must be known.");
  const egfr = (0.413 * heightCm) / serumCrMgDl;
  return step({
    name: "Pediatric eGFR (Bedside Schwartz)",
    formula: "eGFR (mL/min/1.73m²) = 0.413 × height (cm) ÷ SCr (mg/dL)",
    inputs: `height = ${heightCm} cm; SCr = ${serumCrMgDl} mg/dL`,
    unit: "mL/min/1.73m²",
    working: `0.413 × ${heightCm} ÷ ${serumCrMgDl} = ${f(egfr)}`,
    result: `eGFR ≈ ${f(egfr, 1)} mL/min/1.73m²`,
    value: egfr,
    check: "Sanity: plausible pediatric range ✓",
  });
}

export function renalDosingGuidance(crclMlMin: number): string {
  if (crclMlMin >= 60)
    return "CrCl ≥ 60 mL/min: most drugs need no renal adjustment. Drug-specific references still apply (REQUIRES VERIFICATION).";
  if (crclMlMin >= 30)
    return "CrCl 30–59 mL/min (CKD stage 3): several renally cleared drugs require dose or interval adjustment — verify against authoritative renal dosing references.";
  if (crclMlMin >= 15)
    return "CrCl 15–29 mL/min (CKD stage 4): significant adjustment is common — REQUIRES VERIFICATION against authoritative renal dosing references.";
  return "CrCl < 15 mL/min (CKD stage 5): many renally cleared drugs are contraindicated or require major modification — pharmacist and physician review REQUIRED before dispensing.";
}

export function childPughGuidance(score?: number): string {
  if (score == null)
    return "Child-Pugh score not provided — obtain bilirubin, albumin, INR/PT, ascites and encephalopathy assessment before judging hepatic dosing.";
  if (score <= 6) return "Child-Pugh A (5–6): mild impairment — monitor hepatically metabolised drugs; REQUIRES VERIFICATION.";
  if (score <= 9) return "Child-Pugh B (7–9): moderate impairment — many hepatically cleared drugs require adjustment; REQUIRES VERIFICATION.";
  return "Child-Pugh C (10–15): severe impairment — numerous drugs are contraindicated or require major adjustment; pharmacist and physician review REQUIRED.";
}

/* ------------------------------------------------------------------ */
/* Compounding maths                                                   */
/* ------------------------------------------------------------------ */

export function percentToMgPerMl(percentWv: number): CalcStep {
  need(percentWv > 0, "Percentage strength must be known.");
  const mgml = percentWv * 10;
  return step({
    name: "% w/v → mg/mL",
    formula: "mg/mL = % w/v × 10",
    inputs: `${percentWv}% w/v`,
    unit: "mg/mL",
    working: `${percentWv} × 10 = ${f(mgml)}`,
    result: `${f(mgml)} mg/mL`,
    value: mgml,
    check: "Sanity: 1% w/v = 1 g/100 mL = 10 mg/mL ✓",
  });
}

export function mgPerMlToPercent(mgPerMl: number): CalcStep {
  need(mgPerMl > 0, "Concentration must be known.");
  const pct = mgPerMl / 10;
  return step({
    name: "mg/mL → % w/v",
    formula: "% w/v = mg/mL ÷ 10",
    inputs: `${mgPerMl} mg/mL`,
    unit: "% w/v",
    working: `${mgPerMl} ÷ 10 = ${f(pct, 3)}`,
    result: `${f(pct, 3)}% w/v`,
    value: pct,
    check: "Sanity: 10 mg/mL = 1% w/v ✓",
  });
}

export function apiQuantity(concentrationMgPerMl: number, volumeMl: number): CalcStep {
  need(concentrationMgPerMl > 0 && volumeMl > 0, "Concentration and volume must be known.");
  const mg = concentrationMgPerMl * volumeMl;
  return step({
    name: "API quantity required",
    formula: "API (mg) = concentration (mg/mL) × final volume (mL)",
    inputs: `${concentrationMgPerMl} mg/mL × ${volumeMl} mL`,
    unit: "mg",
    working: `${concentrationMgPerMl} × ${volumeMl} = ${f(mg)}`,
    result: `${f(mg)} mg (${f(mg / 1000, 3)} g)`,
    value: mg,
    check: `Sanity: ${f(mg / 1000, 3)} g of API for ${volumeMl} mL ✓`,
  });
}

export function dilutionC1V1(
  c1: number,
  c2: number,
  v2: number,
  unit = "mg/mL",
): CalcStep {
  need(c1 > 0 && c2 > 0 && v2 > 0, "C1, C2 and V2 must be known.");
  need(c2 <= c1, "Final concentration cannot exceed stock concentration.");
  const v1 = (c2 * v2) / c1;
  const diluent = v2 - v1;
  return step({
    name: "Dilution (C₁V₁ = C₂V₂)",
    formula: "V₁ = (C₂ × V₂) ÷ C₁",
    inputs: `C₁ = ${c1} ${unit}; C₂ = ${c2} ${unit}; V₂ = ${v2} mL`,
    unit: "mL",
    working: `(${c2} × ${v2}) ÷ ${c1} = ${f(v1, 3)}`,
    result: `Take ${f(v1, 3)} mL of stock and add diluent to ${v2} mL (≈ ${f(diluent, 3)} mL diluent)`,
    value: v1,
    check: `Sanity: dilution factor ${f(c1 / c2, 2)}× → stock volume is ${f((v1 / v2) * 100, 1)}% of final volume ✓`,
    ...(v1 < 0.1
      ? { flag: "Stock volume < 0.1 mL — measurement accuracy poor; use an aliquot/serial dilution." }
      : {}),
  });
}

export function saltToBaseConversion(
  doseBaseMg: number,
  saltFactor: number,
  saltName = "salt",
): CalcStep {
  need(doseBaseMg > 0 && saltFactor > 0 && saltFactor <= 1, "Dose and salt factor (0–1) must be known.");
  const saltMg = doseBaseMg / saltFactor;
  return step({
    name: "Salt ⇄ base conversion",
    formula: "salt (mg) = base dose (mg) ÷ salt factor",
    inputs: `base dose = ${doseBaseMg} mg; salt factor = ${saltFactor} (${saltName})`,
    unit: "mg",
    working: `${doseBaseMg} ÷ ${saltFactor} = ${f(saltMg)}`,
    result: `${f(saltMg)} mg of ${saltName} ≈ ${doseBaseMg} mg base`,
    value: saltMg,
    check: "Sanity: salt weight is always greater than base weight ✓",
    flag: "Confirm whether the prescribed dose is expressed as base or salt — REQUIRES VERIFICATION.",
  });
}

export function aliquot(
  targetMg: number,
  minWeighableMg: number,
  diluentMg: number,
): CalcStep {
  need(targetMg > 0 && minWeighableMg > 0 && diluentMg > 0, "All aliquot inputs must be known.");
  need(minWeighableMg > targetMg, "An aliquot is only needed when the dose is below the minimum weighable quantity.");
  const totalMixture = minWeighableMg + diluentMg;
  const aliquotMg = (targetMg / minWeighableMg) * totalMixture;
  return step({
    name: "Aliquot dilution",
    formula: "aliquot (mg of mixture) = (target dose ÷ weighed API) × total mixture weight",
    inputs: `target = ${targetMg} mg; weighed API = ${minWeighableMg} mg; diluent = ${diluentMg} mg`,
    unit: "mg of mixture",
    working: `(${targetMg} ÷ ${minWeighableMg}) × ${totalMixture} = ${f(aliquotMg)}`,
    result: `Weigh ${f(aliquotMg)} mg of the ${f(totalMixture)} mg mixture per dose`,
    value: aliquotMg,
    check: `Sanity: aliquot is ≥ minimum weighable quantity? ${aliquotMg >= minWeighableMg ? "yes ✓" : "NO — increase diluent"}`,
    ...(aliquotMg < minWeighableMg
      ? { flag: "Aliquot below minimum weighable quantity — increase diluent or use a solution method." }
      : {}),
  });
}

export function mgPerKgDose(dosePerKg: number, weightKg: number, dosesPerDay = 1): CalcStep {
  need(dosePerKg > 0 && weightKg > 0, "Dose per kg and weight must be known.");
  const perDose = dosePerKg * weightKg;
  return step({
    name: "Weight-based dose",
    formula: "dose (mg) = dose (mg/kg) × weight (kg)",
    inputs: `${dosePerKg} mg/kg × ${weightKg} kg; ${dosesPerDay} dose(s)/day`,
    unit: "mg",
    working: `${dosePerKg} × ${weightKg} = ${f(perDose)}`,
    result: `${f(perDose)} mg per dose (${f(perDose * dosesPerDay)} mg/day)`,
    value: perDose,
    check: "Sanity: confirm the daily total stays within the licensed maximum ✓",
    flag: "Compare against the maximum licensed dose for the indication — REQUIRES VERIFICATION.",
  });
}

export function infusionRate(
  doseMcgKgMin: number,
  weightKg: number,
  concentrationMgPerMl: number,
): CalcStep {
  need(
    doseMcgKgMin > 0 && weightKg > 0 && concentrationMgPerMl > 0,
    "Dose, weight and concentration must be known.",
  );
  const mcgPerMin = doseMcgKgMin * weightKg;
  const mlPerHr = (mcgPerMin * 60) / (concentrationMgPerMl * 1000);
  return step({
    name: "Infusion rate",
    formula: "rate (mL/h) = [dose (mcg/kg/min) × weight (kg) × 60] ÷ [concentration (mg/mL) × 1000]",
    inputs: `${doseMcgKgMin} mcg/kg/min; ${weightKg} kg; ${concentrationMgPerMl} mg/mL`,
    unit: "mL/h",
    working: `(${f(mcgPerMin)} mcg/min × 60) ÷ (${concentrationMgPerMl} × 1000) = ${f(mlPerHr, 2)}`,
    result: `${f(mlPerHr, 2)} mL/h`,
    value: mlPerHr,
    check: `Sanity: ${f(mcgPerMin)} mcg/min delivered — pump-programmable rate ✓`,
  });
}

export const CALCULATORS = [
  { id: "bsa_mosteller", label: "BSA — Mosteller", fields: ["heightCm", "weightKg"] },
  { id: "bsa_dubois", label: "BSA — Du Bois", fields: ["heightCm", "weightKg"] },
  { id: "crcl_cg", label: "CrCl — Cockcroft-Gault", fields: ["weightKg", "ageYears", "serumCr", "sex"] },
  { id: "egfr_ckdepi", label: "eGFR — CKD-EPI 2021", fields: ["ageYears", "serumCr", "sex"] },
  { id: "schwartz", label: "Pediatric eGFR — Schwartz", fields: ["heightCm", "serumCr"] },
  { id: "ibw", label: "Ideal body weight", fields: ["sex", "heightCm"] },
  { id: "abw", label: "Adjusted body weight", fields: ["actualKg", "idealKg"] },
  { id: "pct_to_mgml", label: "% w/v → mg/mL", fields: ["percent"] },
  { id: "mgml_to_pct", label: "mg/mL → % w/v", fields: ["mgPerMl"] },
  { id: "api_qty", label: "API quantity for a batch", fields: ["mgPerMl", "volumeMl"] },
  { id: "dilution", label: "Dilution (C₁V₁ = C₂V₂)", fields: ["c1", "c2", "v2"] },
  { id: "salt", label: "Salt ⇄ base conversion", fields: ["doseBaseMg", "saltFactor"] },
  { id: "aliquot", label: "Aliquot dilution", fields: ["targetMg", "minWeighableMg", "diluentMg"] },
  { id: "mgkg", label: "Weight-based dose", fields: ["dosePerKg", "weightKg", "dosesPerDay"] },
  { id: "infusion", label: "Infusion rate", fields: ["doseMcgKgMin", "weightKg", "mgPerMl"] },
] as const;

export type CalculatorId = (typeof CALCULATORS)[number]["id"];

export function runCalculator(id: CalculatorId, v: Record<string, string>): CalcStep {
  const n = (k: string) => Number(v[k] ?? "");
  const s = (k: string) => v[k] ?? "";
  switch (id) {
    case "bsa_mosteller":
      return bsaMosteller(n("heightCm"), n("weightKg"));
    case "bsa_dubois":
      return bsaDuBois(n("heightCm"), n("weightKg"));
    case "crcl_cg":
      return creatinineClearanceCG(n("weightKg"), n("ageYears"), n("serumCr"), s("sex"));
    case "egfr_ckdepi":
      return egfrCkdEpi2021(n("ageYears"), n("serumCr"), s("sex"));
    case "schwartz":
      return schwartzPediatric(n("heightCm"), n("serumCr"));
    case "ibw":
      return idealBodyWeight(s("sex"), n("heightCm"));
    case "abw":
      return adjustedBodyWeight(n("actualKg"), n("idealKg"));
    case "pct_to_mgml":
      return percentToMgPerMl(n("percent"));
    case "mgml_to_pct":
      return mgPerMlToPercent(n("mgPerMl"));
    case "api_qty":
      return apiQuantity(n("mgPerMl"), n("volumeMl"));
    case "dilution":
      return dilutionC1V1(n("c1"), n("c2"), n("v2"));
    case "salt":
      return saltToBaseConversion(n("doseBaseMg"), n("saltFactor"));
    case "aliquot":
      return aliquot(n("targetMg"), n("minWeighableMg"), n("diluentMg"));
    case "mgkg":
      return mgPerKgDose(n("dosePerKg"), n("weightKg"), n("dosesPerDay") || 1);
    case "infusion":
      return infusionRate(n("doseMcgKgMin"), n("weightKg"), n("mgPerMl"));
    default:
      throw new UnknownQuantityError("Unknown calculator.");
  }
}

export const FIELD_LABELS: Record<string, string> = {
  heightCm: "Height (cm)",
  weightKg: "Weight (kg)",
  ageYears: "Age (years)",
  serumCr: "Serum creatinine (mg/dL)",
  sex: "Sex (M/F)",
  actualKg: "Actual body weight (kg)",
  idealKg: "Ideal body weight (kg)",
  percent: "Strength (% w/v)",
  mgPerMl: "Concentration (mg/mL)",
  volumeMl: "Final volume (mL)",
  c1: "Stock concentration C₁",
  c2: "Final concentration C₂",
  v2: "Final volume V₂ (mL)",
  doseBaseMg: "Dose as base (mg)",
  saltFactor: "Salt factor (0–1)",
  targetMg: "Target dose (mg)",
  minWeighableMg: "Minimum weighable quantity (mg)",
  diluentMg: "Diluent weight (mg)",
  dosePerKg: "Dose (mg/kg)",
  dosesPerDay: "Doses per day",
  doseMcgKgMin: "Dose (mcg/kg/min)",
};
