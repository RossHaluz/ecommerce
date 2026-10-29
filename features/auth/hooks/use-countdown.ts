"use client";

import { useCallback, useEffect, useState } from "react";

/** Seconds left until `start(seconds)` runs out; 0 when idle. */
export function useCountdown() {
  const [endsAt, setEndsAt] = useState(0);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (endsAt <= now) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [endsAt, now]);

  const start = useCallback((seconds: number) => {
    const current = Date.now();
    setNow(current);
    setEndsAt(current + seconds * 1000);
  }, []);

  return { secondsLeft: Math.max(0, Math.ceil((endsAt - now) / 1000)), start };
}
