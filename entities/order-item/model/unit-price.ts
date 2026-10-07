export interface PricedLine {
  price: number | string;
  priceForOne?: number | string;
}

/**
 * У рядку кошика price — сума рядка (priceForOne × quantity); бекенд і GA4 чекають ціну за штуку,
 * і сума рядка множилась на кількість удруге. Товар зі сторінки priceForOne не має — там price і є ціна за штуку.
 */
export const unitPrice = ({ price, priceForOne }: PricedLine): number => Number(priceForOne ?? price);
