// client/src/modules/palliative-v2/__tests__/protocol.cancer-pain.test.tsx
import { render, screen } from "@testing-library/react";
import React from "react";
import SymptomBrowser from "../components/SymptomBrowser";
import { Router } from "wouter";

test("renders cancer pain protocol section headings and tables", () => {
  render(<Router base="/"><SymptomBrowser mode="detail" slug="cancer-pain" onBack={()=>{}} /></Router>);
  expect(screen.getByText(/Assessment & Red Flags/i)).toBeInTheDocument();
  expect(screen.getByText(/Typical immediate-release \(IR\) starting ranges/i)).toBeInTheDocument();
  expect(screen.getByText(/Opioid rotation — equianalgesia guide/i)).toBeInTheDocument();
});
