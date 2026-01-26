export function resolveText(primary?: string, fallback = "") {
  if (typeof primary !== "string") return fallback;
  const trimmed = primary.trim();
  return trimmed.length > 0 ? trimmed : fallback;
}
