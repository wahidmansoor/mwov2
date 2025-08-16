// client/src/modules/palliative-v2/__tests__/routes.wouter.test.tsx
import { render, screen } from "@testing-library/react";
import React from "react";
import { Router } from "wouter";
import PalliativeCareV2 from "..";

test("symptoms visible on dashboard", () => {
  render(<Router base="/"><PalliativeCareV2 /></Router>);
  expect(screen.getByText(/Symptom Protocols/i)).toBeInTheDocument();
});
