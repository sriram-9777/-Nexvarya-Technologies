import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { translations } from '../src/data/translations.ts';
import { readRoute } from '../src/utils/navigation.ts';
import { apiAccess } from '../server/access.js';
import { calculateBulkUnitPrice, makeCartItem, reconcileCart, canPurchase, stockState } from '../src/utils/commerce.ts';
import { readStored, saveStored } from '../src/utils/storage.ts';
import { filterSalesOrders } from '../src/utils/reporting.ts';
import { hashPassword, verifyPassword } from '../src/utils/passwords.ts';
import { normalizePhone, getShopCatalogUrl } from '../src/utils/qrCodeGenerator.ts';
import { uiEnglish, uiTelugu } from '../src/data/uiTranslations.ts';
import type { Product, Shop, Order } from '../src/types/index.ts';

const shop = { id: 'shop', status: 'approved', isOpen: true } as Shop;
const product: Product = {
  id: 'rice', shopId: 'shop', categoryId: 'grocery', name: 'Rice', description: '',
  price: 65, sellingType: 'kg', stockStatus: 'in_stock', isAvailable: true,
  enableBulkDiscount: true, bulkDiscounts: [
    { id: 'large', minQty: 25, maxQty: null, discountType: 'fixed_price', discountValue: 61 },
    { id: 'small', minQty: 10, maxQty: 24, discountType: 'fixed_price', discountValue: 63 },
  ],
};

test('real pricing engine applies tier boundaries and fractional currency', () => {
  assert.equal(calculateBulkUnitPrice(product, 9).effectivePrice, 65);
  assert.equal(calculateBulkUnitPrice(product, 10).effectivePrice, 63);
  assert.equal(calculateBulkUnitPrice(product, 24).effectivePrice, 63);
  assert.equal(calculateBulkUnitPrice(product, 25).effectivePrice, 61);
  const oil = { ...product, price: 150, bulkDiscounts: [{ id: 'oil', minQty: 5, maxQty: null, discountType: 'percentage' as const, discountValue: 5 }] };
  assert.equal(makeCartItem(oil, shop, 5)?.totalPrice, 712.5);
});

test('discounts cannot produce negative prices or increase the base price', () => {
  for (const [discountType, discountValue, expected] of [['percentage', 120, 0], ['fixed_price', 500, 65]] as const) {
    assert.equal(calculateBulkUnitPrice({ ...product, bulkDiscounts: [{ id:'bad', minQty:1, maxQty:null, discountType, discountValue }] }, 1).effectivePrice, expected);
  }
});

test('cart respects minimum quantities, stock limits and invalid input', () => {
  const limited = { ...product, minOrderQuantity: 5, stockQuantity: 8 };
  assert.equal(makeCartItem(limited, shop, 1)?.quantity, 5);
  assert.equal(makeCartItem(limited, shop, 20)?.quantity, 8);
  for (const quantity of [0,-1,NaN,Infinity]) assert.equal(makeCartItem(product, shop, quantity), null);
  assert.equal(makeCartItem({ ...limited, stockQuantity: 4 }, shop, 5), null);
});

test('unavailable products and closed/unapproved shops cannot be purchased', () => {
  for (const change of [{ isAvailable:false }, { productStatus:'disabled' }, { productStatus:'out_of_stock' }, { stockStatus:'out_of_stock' }, { stockQuantity:0 }]) {
    assert.equal(canPurchase({ ...product, ...change } as Product, shop), false);
  }
  assert.equal(canPurchase(product, { ...shop, isOpen:false }), false);
  assert.equal(canPurchase(product, { ...shop, status:'pending' }), false);
  assert.equal(canPurchase(product, { ...shop, id:'other' }), false);
});

test('untracked inventory is not falsely reported as zero stock', () => {
  assert.equal(stockState(product), 'in_stock');
  assert.equal(stockState({ ...product, stockQuantity:0 }), 'out_of_stock');
  assert.equal(stockState({ ...product, stockQuantity:5, lowStockThreshold:10 }), 'limited');
  assert.equal(stockState({ ...product, stockQuantity:5, lowStockThreshold:0 }), 'in_stock');
});

test('cart refreshes edited prices and removes deleted products', () => {
  const original = makeCartItem(product, shop, 2)!;
  const fresh = reconcileCart([original], [{ ...product, price:80 }], [shop]);
  assert.equal(fresh[0].totalPrice, 160);
  assert.equal(fresh[0].product.price, 80);
  assert.deepEqual(reconcileCart([original], [], [shop]), []);
  assert.deepEqual(reconcileCart([original], [product], [{ ...shop, status:'blocked' }]), []);
});

test('saved empty collections stay empty; malformed JSON falls back', () => {
  const values = new Map<string,string>();
  Object.defineProperty(globalThis, 'localStorage', { configurable:true, value:{getItem:(k:string)=>values.get(k) ?? null, setItem:(k:string,v:string)=>values.set(k,v)} });
  saveStored('products', []);
  assert.deepEqual(readStored('products', [product]), []);
  values.set('products', '{broken');
  assert.deepEqual(readStored('products', [product]), [product]);
  values.set('products', '{}');
  assert.deepEqual(readStored('products', [product]), [product]);
  Object.defineProperty(globalThis, 'localStorage', { configurable:true, get(){ throw new Error('Blocked storage'); } });
  assert.deepEqual(readStored('products', [product]), [product]);
  assert.doesNotThrow(()=>saveStored('products', []));
});

test('sales periods filter actual order dates, including month/year boundaries', () => {
  const now = new Date(2026,0,2,12);
  const orders = [new Date(2026,0,2,10), new Date(2026,0,1,10), new Date(2025,11,31,10), new Date(2025,10,30,10)]
    .map((date,i)=>({id:String(i),createdAt:date.toISOString()} as Order));
  assert.deepEqual(filterSalesOrders(orders,'today',now).map(o=>o.id), ['0']);
  assert.deepEqual(filterSalesOrders(orders,'yesterday',now).map(o=>o.id), ['1']);
  assert.deepEqual(filterSalesOrders(orders,'this_month',now).map(o=>o.id), ['0','1']);
  assert.deepEqual(filterSalesOrders(orders,'last_month',now).map(o=>o.id), ['2']);
  assert.equal(filterSalesOrders(orders,'7days',now).length, 3);
});

test('passwords are salted, verified, and reject incorrect or missing credentials', async () => {
  const first = await hashPassword('Test-only-password');
  const second = await hashPassword('Test-only-password');
  assert.notEqual(first, second);
  assert.equal(await verifyPassword('Test-only-password', first), true);
  assert.equal(await verifyPassword('wrong', first), false);
  assert.equal(await verifyPassword('', undefined), false);
  assert.equal(await verifyPassword('x', 'pbkdf2:bad:bad'), false);
});

test('QR catalog links preserve deployed subpaths and phone links normalize', () => {
  Object.defineProperty(globalThis, 'window', { configurable:true, value:{location:{origin:'https://example.com',pathname:'/shop-app/'}} });
  assert.equal(getShopCatalogUrl('shop 1'), 'https://example.com/shop-app/?shop=shop%201');
  assert.equal(normalizePhone('79976 79777'), '917997679777');
  assert.equal(normalizePhone('+91 79976 79777'), '917997679777');
});

test('added interface strings have both English and Telugu entries', () => {
  assert.deepEqual(Object.keys(uiEnglish).sort(), Object.keys(uiTelugu).sort());
  for (const [key, value] of Object.entries(uiTelugu)) {
    assert.ok(value.trim(), key);
    assert.ok(/[\u0C00-\u0C7F]/.test(value), `Missing Telugu: ${key}`);
  }
});

test('every literal translation reference exists in both dictionaries', () => {
  for (const file of fs.readdirSync('src', { recursive:true }).filter(file => String(file).endsWith('.tsx'))) {
    const content = fs.readFileSync(`src/${file}`, 'utf8');
    for (const match of content.matchAll(/\bt\((['"])(.*?)\1\)/g)) {
      assert.ok(translations.en[match[2]], `English ${match[2]} in ${file}`);
      assert.ok(translations.te[match[2]], `Telugu ${match[2]} in ${file}`);
    }
  }
});

test('navigation restores pages and shop links and rejects unknown pages', () => {
  assert.deepEqual(readRoute('?page=profile'), { page:'profile', shop:null });
  assert.deepEqual(readRoute('?shop=shop_1'), { page:'shop-detail', shop:'shop_1' });
  assert.deepEqual(readRoute('?page=unknown'), { page:'home', shop:null });
});

test('management API rejects public user IDs and fails closed without a key', () => {
  const call = (key: string | undefined, path: string, token = '') => {
    let result = 200;
    let allowed = false;
    const response = {status(code: number) { result = code; return this; }, json() { return this; }};
    apiAccess(key)({method:'GET',path,headers:{authorization:token}}, response, () => { allowed = true; });
    return { result, allowed };
  };
  assert.deepEqual(call(undefined,'/api/users'), { result:503, allowed:false });
  assert.deepEqual(call('test-key','/api/orders','Bearer user_admin'), { result:401, allowed:false });
  assert.deepEqual(call('test-key','/api/orders','Bearer test-key'), { result:200, allowed:true });
  assert.equal(call(undefined,'/api/shops').allowed, true);
});
