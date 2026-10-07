interface SuccessState {
  mounted: boolean;
  /** redux-persist уже відновив кошик із localStorage (PersistGate у проєкті свідомо немає). */
  rehydrated: boolean;
  hasOrder: boolean;
}

/**
 * На головну — лише коли точно знаємо, що замовлення немає. До монтування й відновлення стану
 * замовлення ще «не видно», і сторінка «Дякуємо» відкидала щойно оформленого покупця на головну.
 */
export const shouldLeaveSuccess = ({ mounted, rehydrated, hasOrder }: SuccessState) => mounted && rehydrated && !hasOrder;
