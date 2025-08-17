import { Button } from "./ui";
import { useLocation } from "wouter";
import clsx from "clsx";

// Sourced from Symptom Protocols: size="sm", variant="outline", px-2.5 py-0.5, font-semibold, rounded-full, text-xs
// (If Button already applies these, just use size/variant)

type Props = {
  label?: string;            // default "Open"
  to?: string;               // if provided, navigate via Wouter
  onClick?: () => void;      // optional explicit handler
  className?: string;
  size?: "sm" | "default" | "lg";
  variant?: string;
};

export default function OpenButton({
  label = "Open",
  to,
  onClick,
  className,
  size,
  variant,
}: Props) {
  const [, setLocation] = useLocation();

  const handleClick = () => {
    if (onClick) return onClick();
    if (to) setLocation(to);
  };

  return (
    <Button
      onClick={handleClick}
      size={size ?? "sm"}
      variant={variant ?? "outline"}
      className={clsx("px-2.5 py-0.5 font-semibold rounded-full text-xs", className)}
    >
      {label}
    </Button>
  );
}
