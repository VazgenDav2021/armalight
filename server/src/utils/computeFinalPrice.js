export const computeFinalPrice = (product, discountValue) => {
  if (!discountValue) return product.price;
  const parsed = parseFloat(discountValue);
  if (isNaN(parsed)) return product.price;
  return product.price - (product.price * parsed) / 100;
};
