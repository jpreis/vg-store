export const toCurrencyString = (value: number) => {
  const numberFormat = new Intl.NumberFormat("de-DE", {
    maximumFractionDigits: value % 100 === 0 ? 0 : 2,
    style: "currency",
    currency: "EUR",
  });

  return numberFormat.format(value / 100);
};
