export function formatDate(date, locales = 'pt-BR', options = {}) {
  return new Intl.DateTimeFormat(locales, options).format(date);
}