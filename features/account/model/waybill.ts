/** «20450123456789» → «20 4501 2345 6789», the way Nova Poshta prints it. */
export const formatTtn = (ttn: string) => ttn.replace(/^(\d{2})(\d{4})(\d{4})(\d{4})$/, "$1 $2 $3 $4");

export const novaPoshtaTrackingUrl = (ttn: string) => `https://novaposhta.ua/tracking/?cargo_number=${encodeURIComponent(ttn)}`;
