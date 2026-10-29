"use client";

import { useTranslations } from "next-intl";
import { useGoogleReturn } from "../hooks/use-google-return";
import { GoogleFailed } from "./google-failed";

// A full load: `next` already carries the language prefix, and server parts must see the new session.
const goBack = (next: string) => window.location.replace(next);

/** Landing page after Google: signs in and goes back, or explains what went wrong. */
export const GoogleCallback = () => {
  const t = useTranslations("auth");
  const failure = useGoogleReturn(goBack);

  if (failure) return <GoogleFailed reason={failure} />;
  return (
    <p role="status" className="m-0 py-16 text-center text-base font-bold text-[#484848]">
      {t("googleSigningIn")}
    </p>
  );
};
