# 1.3 Radiation Biology

## Introduction

Radiation biology is the study of the effects of ionizing radiation on living organisms, from DNA-level damage to tissue-level responses. In radiation oncology, understanding how radiation impacts both cancer cells and normal tissues is essential for designing effective and safe treatments.

The biological effectiveness of radiation depends on many factors, including dose, dose rate, radiation quality (LET), cellular repair capacity, oxygenation, and the cell cycle phase. By understanding these processes, clinicians can exploit differences between tumor and normal tissue responses to optimize tumor control while minimizing toxicity.

This section outlines the mechanisms of DNA damage and repair, cellular radiosensitivity, and key biological models such as the “Four R’s” of radiobiology and the linear-quadratic model that guide modern radiotherapy protocols.

---

## 1. DNA Damage and Repair

Ionizing radiation induces damage to cellular components, with DNA being the most critical target. Radiation can cause:

- **Single-strand breaks (SSBs)**: Common, often repairable
- **Double-strand breaks (DSBs)**: Less frequent but more lethal and harder to repair
- **Base damage** and **DNA-protein crosslinks**

### Mechanisms of Damage

1. **Direct effect**: Radiation directly ionizes DNA molecules
2. **Indirect effect**: Radiation ionizes water molecules (radiolysis), producing free radicals (e.g., hydroxyl radicals) that in turn damage DNA

The **indirect effect** accounts for ~70% of radiation-induced DNA damage in low LET radiation (e.g., X-rays, gamma rays).

### Repair Pathways

Cells can repair DNA damage using:
- **Non-homologous end joining (NHEJ)**: Error-prone but rapid; predominant in G1 phase
- **Homologous recombination (HR)**: High-fidelity repair using sister chromatid; active in S/G2 phase

Tumors with deficient repair mechanisms (e.g., BRCA-mutated cancers) are often more radiosensitive and may respond better to therapies that exploit DNA repair inhibition.

---

## 2. Cell Cycle and Radiosensitivity

Cellular sensitivity to radiation varies throughout the cell cycle:

| Phase      | Radiosensitivity |
|------------|------------------|
| G2/M       | Highest           |
| G1         | Intermediate      |
| S phase    | Most resistant    |

- **Mitosis (M phase)** is the most sensitive phase due to condensed chromatin and limited repair time.
- Cells in **S phase** have high DNA repair activity, contributing to resistance.

This variation explains the use of fractionation to expose different cell populations during radiosensitive phases over time.

---

## 3. Linear Energy Transfer (LET) and RBE

### Linear Energy Transfer (LET)

LET refers to the energy deposited per unit path length (keV/μm). It influences the complexity and reparability of DNA damage.

- **Low LET radiation** (e.g., X-rays, gamma rays): Sparse ionization, more repairable
- **High LET radiation** (e.g., neutrons, carbon ions): Dense ionization, complex DNA damage, less repairable

### Relative Biological Effectiveness (RBE)

RBE compares the effectiveness of different radiation types relative to a reference (typically 250 kVp X-rays):

\[
RBE = \frac{\text{Dose of reference radiation}}{\text{Dose of test radiation for same biological effect}}
\]

- RBE increases with LET up to a point (~100 keV/μm), beyond which overkill occurs.
- **Protons**: RBE ~1.1; **Carbon ions**: RBE ~2–3+

---

## 4. The Four R’s of Radiobiology

The **Four R’s** describe the biological rationale for delivering radiation over multiple fractions:

### 1. **Repair**
- Normal cells repair sublethal damage better than tumor cells.
- Fractionation allows repair of normal tissue between treatments.

### 2. **Repopulation**
- Both normal and tumor cells can repopulate between fractions.
- Accelerated repopulation of tumor cells after ~3–4 weeks can reduce treatment efficacy, especially in head and neck cancers.

### 3. **Redistribution**
- Cells move into more radiosensitive phases (e.g., G2/M) between fractions.
- Enhances the overall effectiveness of treatment.

### 4. **Reoxygenation**
- Hypoxic tumor regions are radioresistant.
- Fractionation allows previously hypoxic cells to become reoxygenated, increasing radiosensitivity.

Together, these principles justify the delivery of radiotherapy in multiple fractions and form the foundation of standard treatment regimens.

---

## 5. Tumor Hypoxia

### Oxygen Effect

Oxygen enhances the effectiveness of low LET radiation via the **oxygen fixation hypothesis**:

- Radiation-induced free radicals cause DNA damage
- In the presence of oxygen, these radicals form permanent damage
- **Oxygen Enhancement Ratio (OER)**:
  \[
  OER = \frac{\text{Dose under hypoxia}}{\text{Dose under oxygenated conditions (for same effect)}}
  \]
  - Typically ~2.5–3 for low LET radiation

Hypoxic tumors are more resistant to radiation and often correlate with poor prognosis. Strategies to overcome hypoxia include:
- Hyperbaric oxygen
- Hypoxic cell radiosensitizers (e.g., nimorazole)
- High LET radiation (less oxygen dependent)

---

## 6. Cell Survival Curves and the Linear-Quadratic Model

### Cell Survival Curve

Radiation dose-response relationships are modeled using **cell survival curves**, which show the fraction of surviving cells vs. dose.

### Linear-Quadratic (LQ) Model

Used to describe the shape of the survival curve:

\[
S = e^{-(\alpha D + \beta D^2)}
\]

- *S*: surviving fraction  
- *D*: dose  
- *α*: linear component (single-hit killing)  
- *β*: quadratic component (two-event killing)

**α/β ratio**:
- High (10 Gy): early-responding tissues, tumors
- Low (2–3 Gy): late-responding tissues (e.g., spinal cord)

The LQ model underpins BED and EQD2 calculations, helping clinicians compare different dose regimens.

---

## 7. Late Effects and Normal Tissue Tolerance

Normal tissues exhibit variable sensitivity to radiation depending on:
- Cell turnover rate
- Vascular supply
- Total dose and fraction size

### Early-responding tissues (e.g., mucosa, bone marrow)
- Exhibit acute toxicity during or soon after treatment
- Typically reversible

### Late-responding tissues (e.g., spinal cord, lung, kidney)
- Show delayed toxicity months to years later
- Often irreversible and dose-limiting

Accurate prediction of normal tissue tolerance is critical in treatment planning and is guided by dose constraints (e.g., QUANTEC, RTOG).

---

## Conclusion

Radiation biology provides the scientific rationale behind the clinical application of radiotherapy. From DNA damage and repair pathways to oxygenation and fractionation strategies, these biological principles shape every aspect of treatment design. As techniques evolve and become more personalized, an in-depth understanding of how radiation interacts with cells and tissues remains central to achieving optimal therapeutic outcomes while minimizing harm.
