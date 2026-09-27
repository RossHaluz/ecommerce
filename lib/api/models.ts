import { CACHE_TAGS, ENDPOINTS } from "./endpoints";
import { request, orNull, STORE_ID } from "./http";
import type { Model } from "@/lib/types";

const MODELS_TTL = 3600;

export function fetchModels() {
  return request<Model[]>(ENDPOINTS.models(STORE_ID), {
    revalidate: MODELS_TTL,
    tags: [CACHE_TAGS.models],
  });
}

export const getModels = () => orNull("models", fetchModels());

export function fetchModelDetails(modelSlug: string) {
  return request<Model>(ENDPOINTS.modelDetails(STORE_ID, modelSlug), {
    revalidate: MODELS_TTL,
    tags: [CACHE_TAGS.models],
  });
}

export const getModelDetails = (modelSlug: string) =>
  orNull("modelDetails", fetchModelDetails(modelSlug));
