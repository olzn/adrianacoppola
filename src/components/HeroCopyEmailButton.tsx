"use client";

import { useEffect, useRef, useState } from "react";
import { SlotText } from "slot-text/react";
import "slot-text/style.css";
import { RichButton } from "@/components/RichButton";

const EMAIL_ADDRESS = "adriana.c.coppola@gmail.com";
const COPY_LABEL = "Copy e-mail";
const COPIED_LABEL = "Copied";
const RESET_DELAY_MS = 1600;

type LegacyCopyDocument = Document & {
  execCommand(commandId: "copy"): boolean;
};

const copyText = async (text: string) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.inset = "0 auto auto 0";
  textArea.style.opacity = "0";
  textArea.style.pointerEvents = "none";
  document.body.append(textArea);
  textArea.focus();
  textArea.select();

  const copied = (document as LegacyCopyDocument).execCommand("copy");
  textArea.remove();

  if (!copied) {
    throw new Error("Copy command failed");
  }
};

export default function HeroCopyEmailButton() {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => {
    if (resetTimer.current) {
      window.clearTimeout(resetTimer.current);
    }
  }, []);

  const handleCopy = async () => {
    if (resetTimer.current) {
      window.clearTimeout(resetTimer.current);
    }

    try {
      await copyText(EMAIL_ADDRESS);
      setCopied(true);
      resetTimer.current = window.setTimeout(() => {
        setCopied(false);
      }, RESET_DELAY_MS);
    } catch (error) {
      setCopied(false);
      console.error("Could not copy e-mail address", error);
    }
  };

  const label = copied ? COPIED_LABEL : COPY_LABEL;

  return (
    <RichButton
      type="button"
      className="hero-copy-email"
      aria-label={copied ? `Copied ${EMAIL_ADDRESS}` : `Copy ${EMAIL_ADDRESS}`}
      data-copied={copied ? "true" : "false"}
      onClick={handleCopy}
    >
      <span className="hero-copy-email__label" aria-live="polite">
        <SlotText
          text={label}
          options={{ direction: copied ? "up" : "down" }}
        />
      </span>
    </RichButton>
  );
}
