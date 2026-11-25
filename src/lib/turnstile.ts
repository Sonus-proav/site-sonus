declare global {
  interface Window {
    __SONUS_PRERENDER__?: boolean;
  }
}

export const PROD_TURNSTILE_SITE_KEY = "0x4AAAAAADmmjbWL-CsAzHC9";
export const DEV_TEST_TURNSTILE_SITE_KEY = "1x00000000000000000000AA";

export function isTurnstilePrerender(): boolean {
  return typeof window === "undefined" || Boolean(window.__SONUS_PRERENDER__);
}

export function getTurnstileSiteKey(): string {
  const envKey = import.meta.env.VITE_TURNSTILE_SITE_KEY?.trim();
  if (envKey) return envKey;

  if (
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
  ) {
    return DEV_TEST_TURNSTILE_SITE_KEY;
  }

  return PROD_TURNSTILE_SITE_KEY;
}

export const TURNSTILE_OPTIONS = {
  theme: "dark" as const,
  language: "pt-br" as const,
};
