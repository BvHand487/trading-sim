export function formatNumber(value: number): string {
  if (value >= 1000) return value.toFixed(2);
  if (value >= 100) return value.toFixed(3);
  if (value >= 1) return value.toFixed(5);
  if (value >= 0.01) return value.toFixed(6);
  return value.toFixed(8);
}