# 1.2 Basic Radiation Physics

## Introduction

Radiation oncology relies on the application of ionizing radiation to treat malignant diseases by inducing damage to the DNA of cancer cells. The safe and effective use of radiation therapy requires a foundational understanding of radiation physics—how radiation is generated, how it interacts with matter, and how it is measured and controlled. These principles underpin every step of the treatment process, from simulation and planning to delivery and quality assurance.

This section provides an in-depth overview of the fundamental concepts in radiation physics, including the types of radiation used in clinical settings, units of measurement, interactions with tissue, and key dosimetric parameters such as dose rate, linear energy transfer (LET), and biologically effective dose (BED). A sound grasp of these principles allows clinicians and physicists to design treatments that maximize tumor control while minimizing exposure to healthy tissues.

---

## 1.2.1 Types of Radiation Used in Oncology

Ionizing radiation is classified into electromagnetic and particulate radiation based on its physical properties. Both are employed in radiation oncology, with the choice depending on tumor location, depth, and clinical objectives.

### Electromagnetic Radiation (Photons)

- **X-rays**: Produced by linear accelerators (LINACs), with energies typically ranging from 4 to 25 megavolts (MV). These high-energy beams are the mainstay of external beam radiation therapy (EBRT).
- **Gamma rays**: Emitted by radioactive isotopes such as cobalt-60. Although largely supplanted by LINACs, gamma rays are still used in brachytherapy and radiosurgical systems like the Gamma Knife.

Both X-rays and gamma rays travel at the speed of light and have no mass or charge. Their interaction with tissue is stochastic, meaning the probability of interaction increases with dose and tissue density.

### Particulate Radiation

Particulate radiation consists of particles with mass, some of which carry an electrical charge. They exhibit different patterns of energy deposition in tissue compared to photons.

- **Electrons**: Produced by LINACs and useful for treating superficial tumors (skin, chest wall). They have limited penetration, with rapid dose fall-off beyond the target.
- **Protons**: Charged particles with a unique depth-dose characteristic known as the Bragg peak, enabling highly conformal treatment with minimal exit dose.
- **Carbon ions**: Heavier particles with high LET and enhanced biological effect. Available in select centers, often used for radioresistant or deep-seated tumors.
- **Neutrons**: Uncharged particles used rarely, primarily in specialized high-LET therapies. Their interactions are difficult to control, requiring specific safety measures.

Each radiation type has specific clinical applications based on its energy deposition characteristics, depth of penetration, and biological effectiveness.

---

## 1.2.2 Radiation Dose and Units

### Absorbed Dose

The **absorbed dose** refers to the energy deposited by radiation in a unit mass of tissue. It is the primary quantity used in clinical prescription and planning.

- **Unit**: Gray (Gy)  
  \[ 1 \text{ Gy} = 1 \text{ joule/kilogram} \]  
  \[ 1 \text{ Gy} = 100 \text{ cGy} \]

Dose distribution is visualized using **isodose curves**, which help in conforming radiation delivery to the target volume while minimizing exposure to normal tissues.

### Dose Rate

- Expressed in Gy/min or Gy/hour.
- Important in distinguishing treatment modalities:
  - **Conventional EBRT**: Typically delivered at ~2 Gy per fraction per day.
  - **HDR brachytherapy**: Involves high dose rates delivered over minutes.
  - **LDR brachytherapy**: Uses continuous low-rate exposure over several hours or days.

Dose rate influences biological response—higher rates generally cause greater acute toxicity due to less time for DNA repair.

### Equivalent Dose and Effective Dose

Though not used for therapeutic dose prescription, these quantities are relevant for radiation protection.

- **Equivalent dose (Sv)** accounts for the radiation type (e.g., WR = 1 for photons, 20 for alpha particles).
- **Effective dose** incorporates tissue weighting factors (WT) to estimate stochastic risk across organs.

These concepts are important in occupational exposure monitoring and diagnostic imaging risk assessment.

---

## 1.2.3 Biologically Effective Dose (BED) and EQD2

Fractionation—the delivery of radiation in multiple smaller doses—exploits normal tissue repair capacity. To compare different fractionation regimens, the **biologically effective dose (BED)** and **equivalent dose in 2 Gy fractions (EQD2)** are used.

### BED Formula

\[
BED = nd \times \left(1 + \frac{d}{\alpha/\beta} \right)
\]

- *n*: Number of fractions  
- *d*: Dose per fraction  
- *α/β*: Tissue-specific radiosensitivity ratio

- Tumors: typically 10 Gy  
- Late-reacting tissues (e.g., spinal cord): ~3 Gy

### EQD2 Formula

\[
EQD2 = \frac{BED}{1 + \frac{2}{\alpha/\beta}}
\]

Used to translate any fractionation schedule into an equivalent total dose delivered in 2 Gy fractions—standardizing comparison across different treatment plans.

---

## 1.2.4 Interaction of Radiation with Matter

The therapeutic effect of radiation arises from its interaction with atomic structures in tissue, resulting in ionization and molecular damage, particularly to DNA.

### Photon Interactions

1. **Photoelectric Effect**  
   - Dominates at low energies (<30 keV)  
   - Photon transfers all its energy to an inner-shell electron  
   - Highly dependent on atomic number (Z³); more relevant in diagnostic imaging

2. **Compton Scattering**  
   - Predominant interaction in therapeutic megavoltage ranges  
   - Photon transfers energy to an outer-shell electron and is scattered  
   - Independent of atomic number, hence similar across soft tissues

3. **Pair Production**  
   - Occurs at energies >1.02 MeV  
   - Photon converts into an electron-positron pair  
   - More relevant at very high energies (>10 MeV)

### Electron and Particle Interactions

- Electrons undergo multiple collisions, leading to scattering and dose spread.
- Protons and carbon ions exhibit the **Bragg peak**—a sharp spike in dose at a specific depth, followed by rapid fall-off.
- This enables sparing of normal tissue beyond the tumor, a key advantage in pediatric and critical-structure adjacent tumors.

---

## 1.2.5 LET and RBE

### Linear Energy Transfer (LET)

- Describes the rate at which radiation loses energy as it travels through tissue (keV/μm).
- High-LET radiation (e.g., alpha particles, carbon ions) creates dense ionization tracks and complex DNA damage.
- Low-LET (e.g., photons, electrons) causes isolated damage sites, more amenable to cellular repair.

### Relative Biological Effectiveness (RBE)

- Defined as the ratio of doses between a reference radiation and test radiation to achieve the same biological effect.
- For example, protons have an RBE ~1.1; carbon ions may have RBE 2–3.
- RBE varies by tissue type, radiation quality, dose, and endpoint.

---

## Quality Assurance and Calibration

Accurate dose delivery is critical in radiation therapy:

- **Dosimetry systems** (e.g., ion chambers) are used to calibrate output in water phantoms.
- **TG-51 protocol** (AAPM) is the standard method for calibrating LINACs.
- **Treatment planning systems (TPS)** use Monte Carlo or convolution-superposition algorithms to model dose distributions.

---

## Conclusion

Basic radiation physics serves as the foundation of clinical radiation oncology. From understanding the physical nature of radiation to mastering how it interacts with tissue and how dose is quantified and controlled, physics informs every clinical decision. As treatments become increasingly personalized and precise, mastery of these principles will remain essential for safe, effective, and innovative cancer care.
