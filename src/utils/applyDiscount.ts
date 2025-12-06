export const applyDiscount = (price: number, discountPercentage: string) => {
  const discountValue = parseFloat(discountPercentage.replace('%', ''));
  const discountedPrice = price - (price * discountValue) / 100;
  return parseFloat(discountedPrice.toFixed(2));
};
