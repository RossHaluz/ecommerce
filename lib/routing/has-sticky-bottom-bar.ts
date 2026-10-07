/** Сторінки з липкою панеллю внизу на телефоні: плаваючі кнопки там лягали б на «Купити» / «Підтвердити». */
export const hasStickyBottomBar = (pathname: string) => pathname.includes("/product/") || pathname.includes("/checkout");
