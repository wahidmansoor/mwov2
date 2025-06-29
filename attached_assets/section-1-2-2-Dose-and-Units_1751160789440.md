# 1.2.2 Dose and Units (Gy, cGy, BED)

## Introduction

Radiation dose is a fundamental concept in radiation oncology. It represents the amount of energy imparted by ionizing radiation to biological tissue and is the basis for prescribing, planning, and delivering cancer treatment. Understanding how radiation dose is measured, expressed, and interpreted is essential for ensuring safe, effective, and evidence-based care.

This section covers the core concepts of absorbed dose, equivalent and effective dose, dose rate, and introduces key models like the Biologically Effective Dose (BED) and Equivalent Dose in 2 Gy fractions (EQD2). These tools are indispensable for comparing treatment regimens, understanding toxicity risks, and making informed clinical decisions.

---

## 1. Absorbed Dose

The **absorbed dose** is the amount of radiation energy deposited in a unit mass of tissue.

- **Unit**: Gray (Gy)  
  \[ 1 \text{ Gray (Gy)} = 1 \text{ joule per kilogram} \]  
  \[ 1 \text{ Gy} = 100 \text{ centigray (cGy)} \]

Absorbed dose is the primary unit used for radiation therapy prescriptions. For example, a standard course of curative external beam radiotherapy for prostate cancer may involve a total dose of 78 Gy, delivered in daily 2 Gy fractions.

---

## 2. Dose Rate

**Dose rate** refers to how quickly radiation is delivered over time and is usually expressed in **Gy per minute** (external beam) or **Gy per hour** (brachytherapy).

### Clinical Implications

- **Conventional dose rates** (e.g., 1–6 Gy/min): Most common in LINAC-based treatments.
- **Low-dose-rate (LDR)** brachytherapy: 0.4–2 Gy/h (e.g., permanent prostate seed implants).
- **High-dose-rate (HDR)** brachytherapy: >12 Gy/h, typically delivered in short sessions over minutes.

Biological responses vary with dose rate—higher rates result in more immediate DNA damage, while lower rates allow time for sublethal repair. This is crucial in optimizing therapeutic gain between tumor control and normal tissue tolerance.

---

## 3. Equivalent Dose and Effective Dose

While absorbed dose is central in therapy, other dose quantities help describe radiation risk, particularly outside the therapeutic setting.

### Equivalent Dose (H)

- Accounts for the **type of radiation**.
- Unit: **Sievert (Sv)**
- \[
H = D \times w_R
\]
Where:
- *D* = absorbed dose  
- *w_R* = radiation weighting factor (e.g., 1 for X-rays, 20 for alpha particles)

This concept is more relevant in radiation protection and diagnostic contexts than in therapeutic applications.

### Effective Dose (E)

- Accounts for **tissue sensitivity** and estimates overall biological risk.
- \[
E = \sum (w_T \times H_T)
\]
Where:
- *w_T* = tissue weighting factor  
- *H_T* = equivalent dose in tissue T

Again, used more in occupational exposure and diagnostic risk assessments.

> **Note:** In therapeutic contexts, we primarily use **absorbed dose (Gy)** and not sieverts.

---

## 4. Fractionation and the Need for BED and EQD2

In radiation therapy, doses are typically delivered over multiple sessions or **fractions**. This allows normal tissue to repair between treatments while enhancing tumor control.

However, not all fractionation schemes are biologically equivalent. To account for different fraction sizes and total doses, we use **Biologically Effective Dose (BED)** and **Equivalent Dose in 2 Gy fractions (EQD2)**.

---

## 5. Biologically Effective Dose (BED)

BED allows comparison between different fractionation schedules by modeling how fraction size impacts cell killing, based on the **linear-quadratic (LQ) model**.

\[
BED = nd \times \left(1 + \frac{d}{\alpha/\beta} \right)
\]

Where:  
- *n* = number of fractions  
- *d* = dose per fraction  
- *α/β* = tissue-specific radiosensitivity parameter

### Typical α/β Ratios

| Tissue Type            | α/β Value (Gy) |
|------------------------|----------------|
| Tumors (acute-responding) | ~10           |
| Late-responding tissues (e.g., spinal cord) | ~2–3     |
| Prostate cancer        | ~1.5           |

### Clinical Example:

- 60 Gy in 30 fractions (2 Gy/fraction):
  \[
  BED = 60 \times \left(1 + \frac{2}{10} \right) = 60 \times 1.2 = 72 \text{ Gy}
  \]

BED helps determine whether different schedules are expected to have comparable biological effects, especially in settings like hypofractionation, re-irradiation, or SBRT.

---

## 6. Equivalent Dose in 2 Gy Fractions (EQD2)

EQD2 simplifies BED values into a format familiar to most clinicians by converting them into the dose that would have been delivered in 2 Gy fractions.

\[
EQD2 = \frac{BED}{1 + \frac{2}{\alpha/\beta}}
\]

### Example:

Continuing the example above:
\[
EQD2 = \frac{72}{1 + \frac{2}{10}} = \frac{72}{1.2} = 60 \text{ Gy}
\]

This reinforces that 60 Gy in 30 fractions is biologically equivalent to 60 Gy EQD2.

> **Note:** EQD2 is particularly useful in re-irradiation or when combining treatment schedules using different fractionation.

---

## 7. Dose Prescription and Reporting Standards

### ICRU Guidelines

The **International Commission on Radiation Units and Measurements (ICRU)** provides standards for how dose should be defined and reported:

- **ICRU 50/62**: Established terminology for target volumes (GTV, CTV, PTV) and dose coverage.
- **ICRU 83**: Updated guidance for IMRT, emphasizing volume-based prescription and dose-volume histograms (DVH).

### Dose-Volume Histograms (DVHs)

- Graphical representation of dose distribution across target and normal tissues
- Used to assess whether prescription goals and organ-at-risk (OAR) constraints are met

### Clinical Dose Ranges

| Site/Tumor Type         | Typical Total Dose | Fraction Size     |
|-------------------------|--------------------|-------------------|
| Breast (whole)          | 45–50 Gy            | 1.8–2 Gy          |
| Head and Neck (definitive) | 66–70 Gy         | 2 Gy              |
| Prostate (conventional) | 76–80 Gy            | 1.8–2 Gy          |
| Prostate (hypofractionated) | 60 Gy          | 3 Gy              |
| Brain Metastases (SRS)  | 18–24 Gy (single)   | Single fraction   |

---

## 8. Conclusion

Radiation dose is far more than a number on a prescription—it is a complex, biologically informed quantity that determines the success or failure of cancer treatment. A deep understanding of dose units, fractionation effects, and modeling with BED and EQD2 enables clinicians to personalize treatment plans and make evidence-based decisions. As radiotherapy continues to evolve with new fractionation schedules and advanced delivery techniques, mastery of these fundamental dose concepts remains essential for safe and effective practice.
