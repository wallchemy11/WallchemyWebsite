export function toWhatsAppHref(number: string, message?: string) {
  const digits = number.replace(/[^\d]/g, "");
  if (!digits) return "https://wa.me/";
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${text}`;
}

export function getWhatsAppNumber() {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+91 00000 00000";
}

