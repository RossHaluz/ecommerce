import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sortCarModels = (models: { id: string; name: string }[]) => {
  const audiModels: {
    id: string;
    name: string;
  }[] = [];
  const otherModels: { name: string; id: string }[] = [];

  models?.forEach((model) => {
    if (!model?.name) return;
    if (/^((A|S|RS|Q)\d+|TT|R8|E-TRON\d)/i.test(model?.name)) {
      audiModels.push(model);
    } else {
      otherModels?.push(model);
    }
  });

  const groupedAudi: Record<string, { name: string; id: string }[]> = {};

  audiModels.forEach((model) => {
    const baseModel =
      model.name.match(/^((A|S|RS|Q)\d+|TT|R8|E-TRON\d)/i)?.[0] || model.name;

    if (!groupedAudi[baseModel]) groupedAudi[baseModel] = [];
    groupedAudi[baseModel].push(model);
  });

  const sortedAudi = Object.keys(groupedAudi)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .flatMap((key) =>
      groupedAudi[key]?.sort((m1, m2) => {
        const year1 = m1?.name.match(/\d{4}/g)?.map(Number) || [];
        const year2 = m2?.name?.match(/\d{4}/g)?.map(Number) || [];

        return (year1[0] || 0) - (year2[0] || 0);
      })
    );

  return [...sortedAudi, ...otherModels];
};
