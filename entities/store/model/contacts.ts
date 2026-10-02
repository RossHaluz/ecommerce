/** Один дім для контактів магазину: шапка, футер, меню й сторінка «Контакти» беруть їх звідси. */
export const PHONE_NUMBERS = [
  { tel: "+380673834283", display: "+38 (067) 383 42 83", manager: "ihor" },
  { tel: "+380965722060", display: "+38 (096) 572 20 60", manager: "ivan" },
  { tel: "+380979104659", display: "+38 (097) 910 46 59", manager: "bohdan" },
] as const;

export const MAIN_PHONE = PHONE_NUMBERS[0];

export const TELEGRAM_URL = "https://t.me/+380673834283";
