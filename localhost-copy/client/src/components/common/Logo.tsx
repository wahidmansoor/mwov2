import { motion } from "framer-motion";
import { Dna } from "lucide-react";

interface LogoProps {
  showSubtitle?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Logo({ showSubtitle = false, size = "md", className = "" }: LogoProps) {
  const sizeClasses = {
    sm: {
      container: "w-8 h-8",
      icon: "text-base",
      title: "text-lg",
      subtitle: "text-xs"
    },
    md: {
      container: "w-10 h-10",
      icon: "text-lg",
      title: "text-xl",
      subtitle: "text-xs"
    },
    lg: {
      container: "w-12 h-12",
      icon: "text-xl",
      title: "text-2xl",
      subtitle: "text-sm"
    }
  };

  const classes = sizeClasses[size];

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <motion.div 
        className={`${classes.container} gradient-medical-primary rounded-xl flex items-center justify-center animate-pulse-gentle`}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <Dna className={`${classes.icon} text-white`} />
      </motion.div>
      <div>
        <h1 className={`${classes.title} font-bold text-slate-900`}>OncoVista AI</h1>
        {showSubtitle && (
          <p className={`${classes.subtitle} text-slate-500`}>Advanced Oncology Care</p>
        )}
      </div>
    </div>
  );
}
