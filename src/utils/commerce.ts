import type { Product, Shop, CartItem } from '../types/index.ts';

export const money = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;

export function stockState(product: Product): 'disabled' | 'out_of_stock' | 'limited' | 'in_stock' {
  if (!product.isAvailable || product.productStatus === 'disabled') return 'disabled';
  if (product.productStatus === 'out_of_stock' || product.stockStatus === 'out_of_stock' ||
      (product.stockQuantity !== undefined && product.stockQuantity <= 0)) return 'out_of_stock';
  if (product.stockQuantity !== undefined && product.stockQuantity <= (product.lowStockThreshold ?? 10)) return 'limited';
  return product.stockStatus === 'limited' ? 'limited' : 'in_stock';
}

export function calculateBulkUnitPrice(product: Product, quantity: number) {
  const base = Math.max(0, Number.isFinite(product.price) ? product.price : 0);
  const tier = product.enableBulkDiscount ? [...(product.bulkDiscounts || [])]
    .filter(t => Number.isFinite(t.minQty) && t.minQty > 0 && quantity >= t.minQty &&
      (t.maxQty === null || quantity <= t.maxQty) && Number.isFinite(t.discountValue) && t.discountValue >= 0)
    .sort((a, b) => b.minQty - a.minQty)[0] : undefined;
  const price = !tier ? base : tier.discountType === 'fixed_price'
    ? tier.discountValue : base * (1 - tier.discountValue / 100);
  const effectivePrice = money(Math.min(base, Math.max(0, price)));
  return { effectivePrice, savingsPerUnit: money(base - effectivePrice) };
}

export function canPurchase(product: Product, shop: Shop | undefined) {
  return !!shop && shop.id === product.shopId && shop.status === 'approved' && shop.isOpen &&
    product.isAvailable && product.stockStatus !== 'out_of_stock' &&
    product.productStatus !== 'disabled' && product.productStatus !== 'out_of_stock' &&
    Number.isFinite(product.price) && product.price >= 0 &&
    (product.stockQuantity === undefined || product.stockQuantity > 0);
}

export function makeCartItem(product: Product, shop: Shop, requested: number): CartItem | null {
  if (!canPurchase(product, shop) || !Number.isFinite(requested) || requested <= 0) return null;
  const minimum = Math.max(1, product.minOrderQuantity || 1);
  const quantity = Math.min(Math.max(minimum, requested), product.stockQuantity ?? Infinity);
  if (quantity < minimum) return null;
  const { effectivePrice, savingsPerUnit } = calculateBulkUnitPrice(product, quantity);
  return { product, shop, quantity, effectiveUnitPrice: effectivePrice, savingsPerUnit,
    totalPrice: money(effectivePrice * quantity) };
}

export function reconcileCart(cart: CartItem[], products: Product[], shops: Shop[]) {
  return cart.flatMap(item => {
    const product = products.find(p => p.id === item?.product?.id);
    const shop = shops.find(s => s.id === product?.shopId);
    const fresh = product && shop ? makeCartItem(product, shop, item.quantity) : null;
    return fresh ? [fresh] : [];
  });
}
