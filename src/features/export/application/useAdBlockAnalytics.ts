import { useEffect } from "react";
import { detectAdBlocker } from "@/features/export/application/adBlockDetection";
import { trackEvent } from "@/core/services";

// Sample once per page load, not per component remount.
let reported = false;

/**
 * Measures the ad-block rate for every visitor on app load and reports it to
 * GA — fires `ad_blocker_detected` or `ad_blocker_not_detected` exactly once
 * per session. Decoupled from downloads so the sample covers all users.
 *
 * Caveat: network/DNS blockers (Brave, AdGuard DNS) also block GA, so the
 * count is a lower bound that mainly captures cosmetic blockers (uBlock).
 */
export function useAdBlockAnalytics(): void {
  useEffect(() => {
    if (reported) return;
    reported = true;
    void detectAdBlocker().then((blocked) => {
      trackEvent(blocked ? "ad_blocker_detected" : "ad_blocker_not_detected");
    });
  }, []);
}
