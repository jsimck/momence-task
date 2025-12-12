export const CurrencyCodeToFlag = Object.freeze({
  AUD: 'au',
  BRL: 'br',
  BGN: 'bg',
  CAD: 'ca',
  CNY: 'cn',
  DKK: 'dk',
  EUR: 'eu',
  HKD: 'hk',
  HUF: 'hu',
  ISK: 'is',
  INR: 'in',
  IDR: 'id',
  ILS: 'il',
  JPY: 'jp',
  MYR: 'my',
  MXN: 'mx',
  NZD: 'nz',
  NOK: 'no',
  PHP: 'ph',
  PLN: 'pl',
  RON: 'ro',
  SGD: 'sg',
  ZAR: 'za',
  KRW: 'kr',
  SEK: 'se',
  CHF: 'ch',
  CZK: 'cz',
  THB: 'th',
  TRY: 'tr',
  GBP: 'gb',
  USD: 'us',
});

export function getFlagByCode(code: string): string | null {
  return CurrencyCodeToFlag[code as keyof typeof CurrencyCodeToFlag] || null;
}

export function getFlagImageByCode(code: string): string {
  const flagCode = getFlagByCode(code);

  if (!flagCode) {
    return '/flag-fallback.svg';
  }

  return `https://flagcdn.com/${flagCode}.svg`;
}
