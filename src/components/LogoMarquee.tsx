import { Marquee } from "@/components/Marquee";
import type { CSSProperties, SyntheticEvent } from "react";

interface Logo {
  src: string;
  alt: string;
  displayWidth?: string;
  width: number;
  height: number;
}

interface LogoMarqueeProps {
  logos: Logo[];
}

type LogoMarkStyle = CSSProperties & {
  "--logo-width"?: string;
};

export default function LogoMarquee({ logos }: LogoMarqueeProps) {
  const handleLogoError = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.hidden = true;
    event.currentTarget.parentElement?.setAttribute("data-logo-missing", "true");
  };

  return (
    <Marquee
      aria-label="Selected client logos"
      className="logo-marquee"
      duration={24}
      fadeAmount={12}
      pauseOnHover
    >
      {logos.map((logo) => (
        <span
          className="logo-item"
          data-logo-missing="false"
          key={logo.src}
        >
          <img
            className="logo-mark"
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            loading="eager"
            onError={handleLogoError}
            style={
              {
                "--logo-width": logo.displayWidth ?? `${logo.width}px`,
              } as LogoMarkStyle
            }
          />
          <span className="logo-item__fallback">{logo.alt}</span>
        </span>
      ))}
    </Marquee>
  );
}
