"use client";

import { useQuery } from "@tanstack/react-query";
import { modelsQuery } from "../queries";

export const useModels = () => useQuery(modelsQuery);
