// client/src/modules/palliative-v2/__tests__/esasr.export.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import ESASRPage from "../pages/assessments/ESASRPage";

test("window.print is callable", () => {
  render(<ESASRPage />);
  const printSpy = vi.spyOn(window, "print").mockImplementation(()=>{});
  fireEvent.click(screen.getByText("Print"));
  expect(printSpy).toHaveBeenCalled();
});

test("export triggers anchor creation", () => {
  render(<ESASRPage />);
  const spy = vi.spyOn(document, "createElement");
  fireEvent.click(screen.getByText("Export JSON"));
  expect(spy).toHaveBeenCalledWith("a");
});
