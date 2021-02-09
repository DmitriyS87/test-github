export function dataIsObject(value: any): value is object {
  return (
    typeof value === "object" && value !== null && !(value instanceof FormData)
  );
}
