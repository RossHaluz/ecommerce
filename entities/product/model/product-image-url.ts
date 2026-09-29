/**
 * Один дім для складання URL фото товару. Раніше рядок
 * `${process.env.BACKEND_URL}/products/${url}` (і, в 4 місцях, помилковий
 * варіант із `/public/products/`, що на локальному оточенні давав 404)
 * дублювався в 18+ місцях по всьому проєкту.
 *
 * TODO(MinIO): зараз фото роздає бекенд з локального диска сервера
 * (`express.static("public")`, 5.2 ГБ). Домовлено перевести на MinIO
 * (S3-сумісне сховище, Docker на сервері) — окрема задача, ще не зроблена.
 * Коли перенесемо, зміниться ТІЛЬКИ ця функція: URL стане вказувати на
 * бакет MinIO замість `${BACKEND_URL}/products/`. Це і є весь сенс мати
 * один дім для цього факту — жодна картка товару, жоден рядок кошика це
 * не знатимуть.
 */
export function productImageUrl(imageUrl: string | undefined): string | null {
  if (!imageUrl) return null;
  return `${process.env.BACKEND_URL}/products/${imageUrl}`;
}
