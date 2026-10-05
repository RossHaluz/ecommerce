import { notFound } from "next/navigation";
import { ApiError } from "./http";

/** Для `.catch()` основного вмісту сторінки: 404 бекенда → notFound(), решта помилок летить далі. */
export function notFoundOn404(error: unknown): never {
  if (error instanceof ApiError && error.isNotFound) notFound();
  throw error;
}
