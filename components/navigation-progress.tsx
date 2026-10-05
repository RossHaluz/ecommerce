"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { isNavigationClick } from "@/lib/navigation/is-navigation-click";
import { cn } from "@/lib/utils";

type Phase = "idle" | "started" | "running" | "finishing";

// Якщо перехід так і не стався (помилка, скасування) — не лишати смужку назавжди.
const SAFETY_TIMEOUT_MS = 10_000;

const WIDTH: Record<Phase, string> = { idle: "0%", started: "12%", running: "85%", finishing: "100%" };

/**
 * Смужка вгорі з'являється в момент натискання посилання: на повільному телефоні
 * перехід триває 1–3 с, і без неї незрозуміло, чи натискання спрацювало.
 */
const NavigationProgressBar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [phase, setPhaseState] = useState<Phase>("idle");
  const phaseRef = useRef<Phase>("idle");
  const timers = useRef<number[]>([]);

  const setPhase = (next: Phase) => {
    phaseRef.current = next;
    setPhaseState(next);
  };

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  useEffect(() => {
    // capture: Next Link у фазі спливання вже робить preventDefault для клієнтського переходу.
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor) return;
      const isNavigation = isNavigationClick(
        {
          href: anchor.getAttribute("href") ?? "",
          target: anchor.getAttribute("target") ?? "",
          button: event.button,
          metaKey: event.metaKey,
          ctrlKey: event.ctrlKey,
          shiftKey: event.shiftKey,
          altKey: event.altKey,
          defaultPrevented: event.defaultPrevented,
        },
        new URL(window.location.href)
      );
      if (!isNavigation) return;

      clearTimers();
      setPhase("started");
      timers.current.push(
        window.setTimeout(() => setPhase("running"), 30),
        window.setTimeout(() => setPhase("idle"), SAFETY_TIMEOUT_MS)
      );
    };
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      clearTimers();
    };
  }, []);

  // Нова адреса — перехід відбувся: добігти до кінця і сховатись.
  useEffect(() => {
    if (phaseRef.current === "idle") return;
    clearTimers();
    setPhase("finishing");
    timers.current.push(window.setTimeout(() => setPhase("idle"), 300));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  return (
    <div
      aria-hidden
      className={cn(
        "fixed top-0 left-0 z-[200] h-[3px] bg-[#c0092a] pointer-events-none transition-[width,opacity]",
        phase === "running" ? "duration-[8000ms] ease-out" : "duration-200",
        phase === "idle" ? "opacity-0" : "opacity-100"
      )}
      style={{ width: WIDTH[phase] }}
    />
  );
};

/** useSearchParams потребує Suspense-межу — інакше кешована сторінка втрачає вміст у HTML. */
export const NavigationProgress = () => (
  <Suspense fallback={null}>
    <NavigationProgressBar />
  </Suspense>
);
