# Compounding Calculation Guide

*Clinical Pharmacist AI — Compounding & Precision Therapeutics Expert*

## 1. Design Principles

The calculation engine follows the master prompt's Compounding Calculation Engine requirements. Every calculation returns a structured record containing the formula, the inputs, the units, the working, the result, and an independent reasonableness check. Missing units or quantities raise `UnknownQuantityError` — the engine never silently assumes a missing value. High-risk calculations additionally receive a second verification method (typically a reverse calculation or commutativity plus order-of-magnitude check) and a verification flag.

## 2. Strength and Concentration Conversions

| Function | Formula | Example |
|---|---|---|
| `% w/v → mg/mL` | mg/mL = % w/v × 10 | 2% w/v = 20 mg/mL |
| `mg/mL → % w/v` | % w/v = (mg/mL) ÷ 10 | 25 mg/mL = 2.5% w/v |
| `% w/w → mg/g` | mg/g = % w/w × 10 | 1% w/w = 10 mg/g |
| Ratio strength 1:X → mg/mL | mg/mL = (g solute × 1000) ÷ mL | 1:1000 = 1 mg/mL |

## 3. Batch, Dilution, and Aliquot Calculations

| Function | Formula |
|---|---|
| Total API for batch | Total (mg) = dose per unit (mg) × number of units |
| API for target volume | API (mg) = concentration (mg/mL) × final volume (mL) |
| Dilution | V2 = (C1 × V1) ÷ C2; diluent = V2 − V1 |
| Dose-volume conversion | Volume (mL) = dose (mg) ÷ concentration (mg/mL) |
| Aliquot | Aliquot mass = (target API ÷ total API) × total mixture mass |

The aliquot and small-dose calculations flag the minimum weighable quantity of the balance as a verification point, because powder uniformity below the balance's sensitivity is a classic compounding failure mode.

## 4. Equivalency Corrections

| Function | Formula |
|---|---|
| Salt-to-base conversion | Equivalent dose = dose × (MW desired ÷ MW current) |
| Potency correction | API mass (mg) = mass weighed × (actual potency ÷ stated potency) |
| Displacement estimate | API volume (mL) = (dose (mg) ÷ 1000) ÷ density (g/mL) |

The potency correction always requires confirmation against the certificate of analysis; the agent never accepts the label potency as fact.

## 5. Parenteral and Osmolarity

Infusion concentration is computed as total drug (mg) ÷ total volume (mL) and carries a mandatory note that sterile preparations require independent double-check and sterility assurance. Theoretical osmolarity is presented as an estimate only, explicitly unsuitable for parenteral products without measurement.

## 6. Patient-Physiology Calculations

| Function | Formula | Notes |
|---|---|---|
| Cockcroft-Gault | CrCl = [(140 − age) × weight × (0.85 if female)] ÷ (72 × SCr) | Weight selection flagged for obesity |
| CKD-EPI 2021 | 142 × min(SCr/κ,1)^α × max(SCr/κ,1)^β × 0.9938^age × (1.012 if female) | Race-free; κ = 0.9 M / 0.7 F |
| Bedside Schwartz | eGFR = 0.413 × height (cm) ÷ SCr | Pediatric only |
| Mosteller BSA | BSA = √[(height cm × weight kg) ÷ 3600] | Cross-checked against DuBois |
| BSA-based dose | Dose = BSA × mg/m² | High-dose flag above thresholds |
| Weight-based dose | Dose = weight (kg) × mg/kg | Optional maximum single-dose cap |
| Devine IBW | 50.0 + 2.3 × (in − 60) male; 45.5 + 2.3 × (in − 60) female | |
| Adjusted BW | ABW = IBW + 0.4 × (actual − IBW) | |

Renal dosing guidance is provided as a staging framework (≥60, 30–59, 15–29, <15 mL/min) with the explicit caveat that drug-specific adjustment must be verified against authoritative references.

## 7. Independent Verification Policy

Every high-risk calculation is verified twice: once by the primary formula and once by an independent method. The engine's `verify_multiplication` helper performs commutativity plus order-of-magnitude checking. Report consumers should understand that a CALCULATED label guarantees only that the arithmetic is exact given the stated inputs — the inputs themselves remain subject to the KNOWN/INFERRED/UNKNOWN classification system.
