/** What fetch should send: a form goes as-is so the browser sets its multipart boundary; anything else as JSON. */
export const encodeBody = (body: unknown): { body?: BodyInit; headers: Record<string, string> } => {
  if (body === undefined || body === null) return { headers: {} };
  if (body instanceof FormData) return { body, headers: {} };
  return { body: JSON.stringify(body), headers: { "Content-Type": "application/json" } };
};
