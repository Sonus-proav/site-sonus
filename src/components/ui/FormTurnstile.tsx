import { useEffect, useRef, useState } from "react";
import { Turnstile, type TurnstileProps } from "@marsidev/react-turnstile";
import {
  getTurnstileSiteKey,
  isTurnstilePrerender,
  TURNSTILE_OPTIONS,
} from "@/lib/turnstile";

interface FormTurnstileProps {
  onSuccess?: TurnstileProps["onSuccess"];
  onError?: TurnstileProps["onError"];
  onExpire?: TurnstileProps["onExpire"];
  options?: TurnstileProps["options"];
  className?: string;
}

export function FormTurnstile({
  onSuccess,
  onError,
  onExpire,
  options = TURNSTILE_OPTIONS,
  className = "min-h-[65px]",
}: FormTurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isTurnstilePrerender()) return;

    let active = true;
    const activate = () => {
      if (active) setShouldRender(true);
    };

    const el = containerRef.current;
    const form = el?.closest("form");
    if (form) {
      form.addEventListener("focusin", activate, { once: true, passive: true });
    }

    let observer: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== "undefined" && el) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            activate();
            observer?.disconnect();
          }
        },
        { rootMargin: "600px 0px" }
      );
      observer.observe(el);
    } else {
      activate();
    }

    return () => {
      active = false;
      observer?.disconnect();
      if (form) {
        form.removeEventListener("focusin", activate);
      }
    };
  }, []);

  if (!shouldRender || isTurnstilePrerender()) {
    return <div ref={containerRef} className={className} />;
  }

  return (
    <div ref={containerRef} className={className}>
      <Turnstile
        siteKey={getTurnstileSiteKey()}
        onSuccess={onSuccess}
        onError={onError}
        onExpire={onExpire}
        options={options}
      />
    </div>
  );
}
