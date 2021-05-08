export function formatNumberToCurrency(number, locales, currency = 'BRL') {
  return new Intl.NumberFormat(locales, {
    style: 'currency',
    currency
  }).format(number);
}