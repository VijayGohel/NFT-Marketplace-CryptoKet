export function hexToDecimal(hexString) {
  const decimalNumber = parseInt(hexString, 16);
  const scaledNumber = (decimalNumber % 10) + 1;
  return scaledNumber;
}
