// client/src/modules/palliative-v2/components/ui.tsx
import React from "react";
import clsx from "clsx";

export const Card = ({ className, children }: any) =>
  <div className={clsx("rounded-2xl border bg-white shadow-sm", className)}>{children}</div>;

export const CardHeader = ({ className, children }: any) =>
  <div className={clsx("p-4 border-b", className)}>{children}</div>;

export const CardTitle = ({ className, children }: any) =>
  <div className={clsx("font-semibold text-lg", className)}>{children}</div>;

export const CardContent = ({ className, children }: any) =>
  <div className={clsx("p-4", className)}>{children}</div>;

export function Button({ children, variant = "solid", className, ...props }: any) {
  const base = "px-3 py-2 rounded-md text-sm";
  const style = variant === "ghost"
    ? "bg-transparent hover:bg-slate-100 border"
    : "bg-slate-900 text-white hover:bg-slate-800";
  return <button className={clsx(base, style, className)} {...props}>{children}</button>;
}

export const Badge = ({ children, variant="solid" }: any) =>
  <span className={clsx(
    "px-2 py-0.5 rounded text-xs border",
    variant==="outline" ? "bg-white" : "bg-slate-900 text-white"
  )}>{children}</span>;

export const Input = (props: any) =>
  <input {...props} className={clsx("border rounded-md px-3 py-2 w-full", props.className)} />;
