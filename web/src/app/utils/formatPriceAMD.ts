export const formatPriceAMD = (value: number) => {
  return new Intl.NumberFormat("hy-AM", {
    style: "currency",
    currency: "AMD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};
