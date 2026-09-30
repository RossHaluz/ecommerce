"use client";

import { useQuery } from "@tanstack/react-query";
import { categoriesQuery } from "../queries";

/** Один мережевий запит на всіх споживачів — TanStack дедуплікує ключ. */
export const useCategories = () => useQuery(categoriesQuery);
