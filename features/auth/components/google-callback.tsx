"use client";

import { useTranslations } from "next-intl";
import { useGoogleReturn } from "../hooks/use-google-return";
import { AddPhone } from "./add-phone";
import { GoogleFailed } from "./google-failed";

// A full load: `next` already carries the language prefix, and server parts must see the new session.
const goBack = (next: string) => window.location.replace(next);

/** Landing page after Google: signs in and goes back, asks for the phone first if there is none, or explains a failure. */
export const GoogleCallback = () => {
  const t = useTranslations("auth");
  const state = useGoogleReturn(goBack);

  if (state.kind === "failed") return <GoogleFailed reason={state.reason} />;
  if (state.kind === "needsPhone") return <AddPhone name={state.name} onDone={() => goBack(state.next)} />;
  return (
    <p role="status" className="m-0 py-16 text-center text-base font-bold text-[#484848]">
      {t("googleSigningIn")}
    </p>
  );
};
