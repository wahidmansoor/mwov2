import { useLocation } from "wouter";
import clsx from "clsx";

// This matches the pill in SymptomBrowser: div with
// text-xs bg-blue-50 text-blue-800 border-blue-200 inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold

export type ActionPillProps = {
  label: string;
  to?: string;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
};

export default function ActionPill({ label, to, onClick, className, ariaLabel }: ActionPillProps) {
  const [, setLocation] = useLocation();

  const handleClick = (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (onClick) return onClick();
    if (to) setLocation(to);
  };

  // Keyboard accessibility for non-button
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick(e);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={ariaLabel || label}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={clsx(
        "text-xs bg-blue-50 text-blue-800 border-blue-200 inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold cursor-pointer select-none transition hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400",
        className
      )}
    >
      {label}
    </div>
  );
}
