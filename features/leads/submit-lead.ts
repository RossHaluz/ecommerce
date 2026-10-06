import browserClient from "@/lib/browser-client";
import { trackEvent } from "@/lib/analytics/gtag";

// Не з lib/api/http: той модуль серверний (cookies()), а форми живуть у браузері.
const STORE_ID = process.env.STORE_ID ?? "";

export interface LeadInput {
  phone: string;
  name?: string;
  vinCode?: string;
  /** Що шукають: назва або каталожний номер. Раніше форма VIN його не надсилала. */
  desc?: string;
  files?: File[];
}

export type LeadType = "call_me" | "vin";

/**
 * Одна дорога для заявок «Передзвоніть мені» і «Підбір за VIN». Через browserClient
 * (база …/api): відносний axios.post після рефакторингу йшов на адресу сайту й ловив 404.
 */
export async function submitLead(input: LeadInput, type: LeadType) {
  const body = new FormData();
  for (const key of ["phone", "name", "vinCode", "desc"] as const) {
    const value = input[key];
    if (value) body.append(key, value);
  }
  input.files?.forEach((file) => body.append("files", file));

  await browserClient.post(`/call-me/${STORE_ID}`, body);
  trackEvent("generate_lead", { lead_type: type });
}
