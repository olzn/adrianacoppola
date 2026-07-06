"use client";

import {
  Children,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";

type MarqueeDirection = "left" | "right" | "up" | "down";

interface MarqueeProps extends HTMLAttributes<HTMLDivElement> {
  duration?: number;
  pauseOnHover?: boolean;
  direction?: MarqueeDirection;
  fade?: boolean;
  fadeAmount?: number;
  children: ReactNode;
}

type MarqueeStyle = CSSProperties & {
  "--marquee-duration"?: string;
};

const joinClassNames = (...classNames: Array<string | false | undefined>) =>
  classNames.filter(Boolean).join(" ");

export function Marquee({
  children,
  className,
  duration = 20,
  pauseOnHover = false,
  direction = "left",
  fade = true,
  fadeAmount = 10,
  style,
  onMouseEnter,
  onMouseLeave,
  ...props
}: MarqueeProps) {
  const [isPaused, setIsPaused] = useState(false);
  const items = Children.toArray(children);
  const isVertical = direction === "up" || direction === "down";
  const fadeMask = isVertical
    ? `linear-gradient(to bottom, transparent 0%, black ${fadeAmount}%, black ${
        100 - fadeAmount
      }%, transparent 100%)`
    : `linear-gradient(to right, transparent 0%, black ${fadeAmount}%, black ${
        100 - fadeAmount
      }%, transparent 100%)`;

  const marqueeStyle: MarqueeStyle = {
    ...style,
    "--marquee-duration": `${duration}s`,
    ...(fade
      ? {
          maskImage: fadeMask,
          WebkitMaskImage: fadeMask,
        }
      : null),
  };

  const handleMouseEnter = (event: MouseEvent<HTMLDivElement>) => {
    onMouseEnter?.(event);
    if (pauseOnHover) setIsPaused(true);
  };

  const handleMouseLeave = (event: MouseEvent<HTMLDivElement>) => {
    onMouseLeave?.(event);
    if (pauseOnHover) setIsPaused(false);
  };

  return (
    <div
      className={joinClassNames("spell-marquee", className)}
      data-direction={direction}
      data-pause-on-hover={pauseOnHover ? "true" : undefined}
      style={marqueeStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div
        className={joinClassNames(
          "spell-marquee__scroller",
          isVertical && "spell-marquee__scroller--vertical",
          isPaused && "is-paused",
        )}
      >
        {items.map((item, index) => (
          <div className="spell-marquee__item" key={`first-${index}`}>
            {item}
          </div>
        ))}
        {items.map((item, index) => (
          <div
            aria-hidden="true"
            className="spell-marquee__item"
            key={`second-${index}`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
