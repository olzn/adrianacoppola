"use client";

import {
  Children,
  useEffect,
  useRef,
  type CSSProperties,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";

const RATE_TRANSITION_MS = 320;

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
  const scrollerRef = useRef<HTMLDivElement>(null);
  const rateFrameRef = useRef<number | null>(null);
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

  useEffect(() => () => {
    if (rateFrameRef.current !== null) cancelAnimationFrame(rateFrameRef.current);
  }, []);

  const transitionPlaybackRate = (targetRate: 0 | 1) => {
    const animation = scrollerRef.current?.getAnimations()[0];
    if (!animation) return;

    if (rateFrameRef.current !== null) cancelAnimationFrame(rateFrameRef.current);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      animation.updatePlaybackRate(targetRate);
      return;
    }

    const initialRate = animation.playbackRate;
    const startedAt = performance.now();
    animation.play();

    const updateRate = (now: number) => {
      const progress = Math.min((now - startedAt) / RATE_TRANSITION_MS, 1);
      const easedProgress = progress * progress * (3 - 2 * progress);
      animation.updatePlaybackRate(
        initialRate + (targetRate - initialRate) * easedProgress,
      );

      if (progress < 1) {
        rateFrameRef.current = requestAnimationFrame(updateRate);
      } else {
        rateFrameRef.current = null;
      }
    };

    rateFrameRef.current = requestAnimationFrame(updateRate);
  };

  const handleMouseEnter = (event: MouseEvent<HTMLDivElement>) => {
    onMouseEnter?.(event);
    if (pauseOnHover) transitionPlaybackRate(0);
  };

  const handleMouseLeave = (event: MouseEvent<HTMLDivElement>) => {
    onMouseLeave?.(event);
    if (pauseOnHover) transitionPlaybackRate(1);
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
        ref={scrollerRef}
        className={joinClassNames(
          "spell-marquee__scroller",
          isVertical && "spell-marquee__scroller--vertical",
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
