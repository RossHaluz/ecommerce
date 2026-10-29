import type { Route } from "@playwright/test";

const CORS = {
  "Access-Control-Allow-Origin": "http://localhost:3000",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST",
};

/** Answers a cross-origin API call inside the browser, preflight included, so nothing reaches the backend. */
export const reply = (route: Route, status: number, body: unknown) =>
  route.request().method() === "OPTIONS"
    ? route.fulfill({ status: 204, headers: CORS })
    : route.fulfill({ status, headers: CORS, contentType: "application/json", body: JSON.stringify(body) });
