"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

type Color =
  | "default"
  | "blue"
  | "purple"
  | "pink"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "teal"
  | "cyan"
  | "indigo"
  | "violet"
  | "rose"
  | "amber"
  | "lime"
  | "sky"
  | "slate"
  | "gray"
  | "zinc"
  | "neutral"
  | "stone"
  | "fuchsia"
  | "emerald";

type SizeVariant = "sm" | "default" | "lg";

interface RichButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: Color;
  size?: SizeVariant;
  className?: string;
  asChild?: boolean;
}

const joinClassNames = (...classNames: Array<string | false | undefined>) =>
  classNames.filter(Boolean).join(" ");

const RichButton = React.forwardRef<HTMLButtonElement, RichButtonProps>(
  (
    {
      children,
      color = "default",
      size = "default",
      className,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={joinClassNames("rich-button", className)}
        data-color={color}
        data-size={size}
        {...props}
      >
        {asChild ? children : (
          <span className="rich-button__content">{children}</span>
        )}
      </Comp>
    );
  },
);

RichButton.displayName = "RichButton";

export { RichButton };
