// client/src/modules/palliative-v2/components/ui.tsx
// Legacy UI components - consider migrating to shared components
import React from "react";
import clsx from "clsx";

export const Card = ({ className, children, ...props }: any) =>
  <div className={clsx("rounded-2xl border bg-white dark:bg-gray-800 shadow-sm", className)} {...props}>{children}</div>;

export const CardHeader = ({ className, children }: any) =>
  <div className={clsx("p-4 border-b border-blue-200 dark:border-blue-800", className)}>{children}</div>;

export const CardTitle = ({ className, children }: any) =>
  <div className={clsx("font-semibold text-lg text-blue-900 dark:text-blue-100", className)}>{children}</div>;

export const CardContent = ({ className, children }: any) =>
  <div className={clsx("p-4", className)}>{children}</div>;

export function Button({ children, variant = "solid", size = "default", className, ...props }: any) {
  const base = "rounded-md font-medium transition-colors";
  const sizeStyles = size === "sm" ? "px-2 py-1 text-xs" : "px-3 py-2 text-sm";
  const style = variant === "ghost"
    ? "bg-transparent hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300"
    : "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800";
  return <button className={clsx(base, sizeStyles, style, className)} {...props}>{children}</button>;
}

export const Badge = ({ children, variant="solid", className }: any) =>
  <span className={clsx(
    "px-2 py-0.5 rounded text-xs border font-medium",
    variant==="outline" 
      ? "bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800" 
      : variant==="destructive"
        ? "bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800"
        : variant==="secondary"
          ? "bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800"
          : "bg-blue-600 text-white border-blue-600",
    className
  )}>{children}</span>;

export const Input = (props: any) =>
  <input {...props} className={clsx("border border-blue-200 dark:border-blue-800 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white", props.className)} />;
