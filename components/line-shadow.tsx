"use client";

import { cn } from "@heroui/react";
import { MotionProps, motion } from "motion/react";

interface LineShadowTextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps>, MotionProps {
  shadowColor?: string;
  as?: React.ElementType;
  [key: string & {}]: unknown;
}

export function LineShadowText({
  children,
  shadowColor = "black",
  className,
  as: Component = "span",
  ...props
}: LineShadowTextProps) {
  const MotionComponent = motion.create(Component);
  const content = typeof children === "string" ? children : null;

  if (!content) {
    throw new Error("LineShadowText only accepts string content");
  }

  return (
    <MotionComponent
      style={{ "--shadow-color": shadowColor } as React.CSSProperties}
      className={cn(
        "relative z-0 inline-flex",
        "after:absolute after:top-[0.05em] after:left-[0.05em] after:content-[attr(data-text)]",
        "after:bg-[repeating-linear-gradient(45deg,var(--shadow-color),var(--shadow-color)_2.5px,transparent_2.5px,transparent_5px)]",
        "after:-z-10 after:bg-size-[3em_3em] after:bg-clip-text after:text-transparent",
        "after:paused hover:after:running after:transition-[top,left] hover:after:top-[0.025em] hover:after:left-[0.025em]",
        "after:animate-line-shadow",
        className,
      )}
      data-text={content}
      {...props}
    >
      {content}
    </MotionComponent>
  );
}
