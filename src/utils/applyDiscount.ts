export const applyDiscount = (price: number, discountPercentage: string) => {
  const discountValue = Number.parseFloat(discountPercentage.replaceAll('%', ''));
  const discountedPrice = price - (price * discountValue) / 100;
  return Number.parseFloat(discountedPrice.toFixed(2));
};
