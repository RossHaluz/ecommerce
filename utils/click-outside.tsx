/**
 * Приймає `(value: boolean) => void`, а не `Dispatch<SetStateAction<boolean>>`
 * — усередині завжди викликається з плоским `false`, функціональний
 * апдейтер (`prev => !prev`) ніколи не потрібен. Звужений тип дозволяє
 * передавати як `useState`-сеттер (він ширший і сумісний), так і звичайний
 * контрольований колбек компонента (наприклад `onToggle` у
 * `HeaderCatalogMenu`).
 */
export const handleClickOutside = (
  ref: React.RefObject<HTMLDivElement>,
  onOutsideClick: (value: boolean) => void
) => {
  return (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      onOutsideClick(false);
    }
  };
};
