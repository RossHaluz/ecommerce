// popstate настає до того, як Next перемалює сторінку, і ніколи — при першому
// відкритті, тож гідратація не розходиться з серверним HTML.
let cameViaHistory = false;
if (typeof window !== "undefined") {
  window.addEventListener("popstate", () => (cameViaHistory = true));
}

/** Сторінку відкрито кнопками «назад»/«вперед» — браузер відновлюватиме прокрутку. */
export const isHistoryNavigation = () => cameViaHistory;
