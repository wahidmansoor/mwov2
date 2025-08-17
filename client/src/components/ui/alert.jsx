// Simple alert component for the example
export function Alert({ children, className = "" }) {
  return (
    <div className={`rounded-lg border border-red-200 bg-red-50 p-4 ${className}`}>
      {children}
    </div>
  );
}

export function AlertDescription({ children, className = "" }) {
  return (
    <div className={`text-sm text-red-700 ${className}`}>
      {children}
    </div>
  );
}
