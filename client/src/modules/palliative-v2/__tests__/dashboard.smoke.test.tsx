// client/src/modules/palliative-v2/__tests__/dashboard.smoke.test.tsx
import { render, screen } from "@testing-library/react";
import React from "react";
import PalliativeCareV2 from "..";
import { Router } from "wouter";

test("dashboard renders", () => {
  render(<Router base="/"><PalliativeCareV2 /></Router>);
  expect(screen.getByTestId("palliative-dashboard-v2")).toBeInTheDocument();
});
