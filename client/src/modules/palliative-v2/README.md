# Palliative Care Module v2 (drop-in)

**Sections:** Dashboard, Symptoms, Emergencies, Calculators, Assessments (ESAS-r, 4AT), Tools (Antiemetic, Bowel).  
**Router:** wouter. **UI:** Tailwind. **Mode:** read-only + offline-friendly.

## Install
1. Copy `client/src/modules/palliative-v2` into your app.
2. Add routes in your `App.tsx`:

```tsx
import { Route } from "wouter";
import PalliativeCareV2 from "@/modules/palliative-v2";
import ESASRPage from "@/modules/palliative-v2/pages/assessments/ESASRPage";
import FourATPage from "@/modules/palliative-v2/pages/assessments/FourATPage";
import AntiemeticSelector from "@/modules/palliative-v2/pages/tools/AntiemeticSelector";
import BowelRegimenWizard from "@/modules/palliative-v2/pages/tools/BowelRegimenWizard";

<Route path="/palliative" component={PalliativeCareV2} />
<Route path="/palliative/symptoms" component={PalliativeCareV2} />
<Route path="/palliative/symptoms/:slug" component={PalliativeCareV2} />
<Route path="/palliative/emergencies" component={PalliativeCareV2} />
<Route path="/palliative/emergencies/:slug" component={PalliativeCareV2} />
<Route path="/palliative/calculators" component={PalliativeCareV2} />
<Route path="/palliative/calculators/:id" component={PalliativeCareV2} />
<Route path="/palliative/assessments/esasr" component={ESASRPage} />
<Route path="/palliative/assessments/4at" component={FourATPage} />
<Route path="/palliative/tools/antiemetic" component={AntiemeticSelector} />
<Route path="/palliative/tools/bowel" component={BowelRegimenWizard} />
```

3. Run dev server and click through the module.

## Notes
- No Education Hub here (it lives elsewhere).
- ESAS-r export filename fixed: `esasr-<epoch>.json`.
- You can swap `components/ui` for your own UI kit anytime.
