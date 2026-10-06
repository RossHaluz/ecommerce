/** «+380 67 ••• •• 67»: на екрані подяки людина впізнає свій номер, а сторонній не прочитає його цілим. */
export function maskPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (!/^380\d{9}$/.test(digits)) return phone;
  return `+380 ${digits.slice(3, 5)} ••• •• ${digits.slice(-2)}`;
}
