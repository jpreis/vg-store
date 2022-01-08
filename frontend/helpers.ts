const numberFormat = new Intl.NumberFormat("de-DE", {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
  style: "currency",
  currency: "EUR",
});

export const toCurrencyString = (value: number) =>
  numberFormat.format(value / 100);
