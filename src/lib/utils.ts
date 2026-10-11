export function toBanglaNumber(value: number | string): string {
  const banglaDigits = "০১২৩৪৫৬৭৮৯";

  return String(value).replace(
    /\d/g,
    (digit) => banglaDigits[Number(digit)]
  );
}

export function formatPrice(price: number): string {
  return toBanglaNumber(
    Math.round(price).toLocaleString("en-US")
  );
}

export function formatChange(change: number): string {
  return toBanglaNumber(
    Math.abs(change).toFixed(1)
  );
}