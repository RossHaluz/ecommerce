import { cookies } from "next/headers";

const API_BASE = `${process.env.BACKEND_URL}/api`;

export const STORE_ID = process.env.STORE_ID ?? "";

export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly path: string,
    message?: string,
  ) {
    super(message ?? `${status} на ${path}`);
    this.name = "ApiError";
  }

  /** 404 від бекенда — привід для notFound(), а не для порожньої сторінки. */
  get isNotFound() {
    return this.status === 404;
  }
}

type QueryValue = string | number | boolean | undefined | null;

export interface RequestOptions {
  params?: Record<string, QueryValue>;
  /** Додати Bearer з cookie. Тільки для персональних даних: читання cookie
   *  робить маршрут динамічним і вимикає ISR, тому публічний каталог його не
   *  використовує. */
  auth?: boolean;
  /** Секунди життя кешу. `false` — не кешувати. */
  revalidate?: number | false;
  tags?: string[];
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
}

function buildUrl(path: string, params?: Record<string, QueryValue>) {
  const url = new URL(`${API_BASE}${path}`);

  for (const [key, value] of Object.entries(params ?? {})) {
    if (value === undefined || value === null || value === "") continue;
    url.searchParams.set(key, String(value));
  }

  return url.toString();
}

function authHeader(): Record<string, string> {
  const token = cookies().get("token")?.value;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function request<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { params, auth, revalidate, tags, method = "GET", body } = options;

  const response = await fetch(buildUrl(path, params), {
    method,
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(auth ? authHeader() : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    ...(revalidate === false
      ? { cache: "no-store" as const }
      : { next: { revalidate, tags } }),
  });

  if (!response.ok) {
    throw new ApiError(response.status, path);
  }

  // Бекенд обгортає корисне навантаження в { data, message }.
  const payload = (await response.json()) as { data?: T } | T;
  return (payload as { data?: T })?.data ?? (payload as T);
}

/**
 * Явне проглочування помилки.
 *
 * Потрібне там, де порожній блок краще за зламану сторінку — наприклад схожі
 * товари. НЕ для основного вмісту сторінки: категорія, якої немає, має давати
 * 404, а не порожній список (крок 8.5).
 */
export async function orNull<T>(
  label: string,
  promise: Promise<T>,
): Promise<T | null> {
  try {
    return await promise;
  } catch (error) {
    if (error instanceof ApiError && error.isNotFound) return null;
    console.error(`[api] ${label}:`, error);
    return null;
  }
}
