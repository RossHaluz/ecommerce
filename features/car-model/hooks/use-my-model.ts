"use client";

import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "@/i18n/routing";
import { useModels } from "@/features/catalog";
import { useHydratedSelector } from "@/hooks/use-hydrated-selector";
import { selectMyCar } from "@/redux/my-car/selectors";
import { forgetCar, rememberCar } from "@/redux/my-car/slice";
import type { Model } from "@/lib/types";
import { modelPath } from "../lib/model-path";
import { keptListQuery } from "../lib/list-query";

/** Обрана модель живе в адресі (її бачить Google і можна поділитися), а пам'ять — лише підказка на потім. */
export const useMyModel = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ modelName?: string }>();
  const { data: models = [] } = useModels();
  const remembered = useHydratedSelector(selectMyCar);
  const routeModel = params?.modelName;

  // Адресу читаємо в момент кліку: useSearchParams змусив би кожну сторінку списку рендеритись без кешу.
  const go = (next: string | undefined) => router.push(`${modelPath(pathname, routeModel, next)}${keptListQuery(window.location.search)}`);

  return {
    models,
    current: models.find((model) => model.modelName === routeModel),
    remembered,
    choose: (model: Pick<Model, "modelName" | "name">) => {
      dispatch(rememberCar({ modelName: model.modelName, name: model.name }));
      go(model.modelName);
    },
    clear: () => {
      dispatch(forgetCar());
      go(undefined);
    },
  };
};
