import type { ReactNode } from "react";

/** Теги для t.rich: виділення позначає переклад, бо його місце в реченні різне в uk і pl. */
export const richTags = {
  b: (chunks: ReactNode) => <b>{chunks}</b>,
};
