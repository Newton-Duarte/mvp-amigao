export function formatDate(date, locales, options = {}) {
  return new Intl.DateTimeFormat(locales, options).format(date);
}