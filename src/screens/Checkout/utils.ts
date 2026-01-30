const formatCardNumber = (value: string) =>
  value
    .replace(/\D/g, '')
    .replace(/(.{4})/g, '$1 ')
    .trim();

const formatExpiryDate = (value: string) => {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
};
export { formatCardNumber, formatExpiryDate };
