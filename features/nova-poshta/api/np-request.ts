const NP_URL = "https://api.novaposhta.ua/v2.0/json/";

/**
 * Довідники міст і відділень Нова пошта віддає без ключа — тож ключ у браузер не потрапляє.
 * Помилку не кидаємо: підказки — допомога, а не умова оформлення.
 */
export async function npRequest<T>(calledMethod: string, methodProperties: Record<string, string>, signal?: AbortSignal) {
  try {
    const response = await fetch(NP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apiKey: "", modelName: "AddressGeneral", calledMethod, methodProperties }),
      signal,
    });
    const json = await response.json();
    return json?.success ? (json.data as T) : null;
  } catch {
    return null;
  }
}
