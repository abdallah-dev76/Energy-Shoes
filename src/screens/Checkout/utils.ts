const formatCardNumber = (value: string) =>
  value
    .replaceAll(/\D/g, '')
    .replaceAll(/(.{4})/g, '$1 ')
    .trim();

const formatExpiryDate = (value: string) => {
  const digits = value.replaceAll(/\D/g, '');
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
};
export { formatCardNumber, formatExpiryDate };
