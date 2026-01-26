export function hexToRgbChannels(input?: string, fallback = "11 10 9") {
  if (!input || typeof input !== "string") return fallback;
  const hex = input.trim().replace("#", "");
  const normalized =
    hex.length === 3
      ? hex
          .split("")
          .map((c) => `${c}${c}`)
          .join("")
      : hex;
  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) return fallback;
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  return `${r} ${g} ${b}`;
}
