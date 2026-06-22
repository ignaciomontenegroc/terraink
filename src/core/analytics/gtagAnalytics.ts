/**
 * Minimal GA4 event wrapper.
 *
 * The gtag loader lives in index.html; this is the single place app code
 * emits events, so features go through core/services rather than touching
 * window.gtag directly. Fails silently — analytics must never break the app
 * (and gtag itself may be absent when blocked).
 */
type AnalyticsParams = Record<string, string | number | boolean>;

export function trackEvent(name: string, params?: AnalyticsParams): void {
  const gtag = (
    window as unknown as {
      gtag?: (command: string, action: string, params?: AnalyticsParams) => void;
    }
  ).gtag;
  if (typeof gtag !== "function") return;
  try {
    gtag("event", name, params);
  } catch {
    // ignore
  }
}
