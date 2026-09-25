/**
 * Minimal, lightweight 0-dependency QR Code Generator Helper
 * Supports encoding URLs, WhatsApp links, and text strings into valid, scannable 2D QR Code matrices.
 */

// Helper to generate a reliable QR Code Image URL (High-res 350x350)
export function getQrCodeImageUrl(data: string, size = 350): string {
  const encoded = encodeURIComponent(data);
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encoded}&margin=10`;
}

// Fallback QR Code Image URL using Google Charts API
export function getQrCodeFallbackUrl(data: string, size = 350): string {
  const encoded = encodeURIComponent(data);
  return `https://chart.googleapis.com/chart?cht=qr&chs=${size}x${size}&chl=${encoded}&choe=UTF-8`;
}

/**
 * Generates a WhatsApp Direct Chat URL for a shop
 */
export function normalizePhone(phone: string): string {
  let digits = phone.replace(/\D/g, '').replace(/^0/, '');
  return digits.length === 10 ? `91${digits}` : digits;
}

export function getShopWhatsAppUrl(phone: string | undefined, businessName: string): string {
  if (!phone) return 'https://wa.me/';
  let clean = phone.replace(/\D/g, '');
  if (clean.startsWith('0')) {
    clean = clean.substring(1);
  }
  if (clean.length === 10) {
    clean = `91${clean}`;
  }
  const text = `Hi ${businessName}, I scanned your Store QR Code on Nexvarya and would like to place an order!`;
  return `https://wa.me/${clean}?text=${encodeURIComponent(text)}`;
}

/**
 * Generates the Store Catalog Web Page URL for a shop
 */
export function getShopCatalogUrl(shopId: string): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://nexvarya.com';
  const path = typeof window !== 'undefined' ? window.location.pathname : '/';
  return `${origin}${path}?shop=${encodeURIComponent(shopId)}`;
}
