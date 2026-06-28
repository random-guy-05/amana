import { type HTMLAttributes, type ReactNode, useRef, useState } from "react";
import { motion } from "framer-motion";

interface GlowCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  tone?: string;
  interactive?: boolean;
}

export function GlowCard({
  children,
  className = "",
  tone = "",
  interactive = false,
  ...rest
}: GlowCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={interactive ? { 
        scale: 1.02, 
        transition: { type: "spring", stiffness: 400, damping: 10 } 
      } : {}}
      className={`glow-card ${tone} ${className}`.trim()}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
