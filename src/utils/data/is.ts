export function dataIsObject<T>(value: T): boolean {
  return (
    typeof value === 'object' && value !== null && !(value instanceof FormData)
  );
}
