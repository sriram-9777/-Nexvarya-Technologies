export const pages = ['home', 'about', 'businesses', 'shop-detail', 'services-products', 'login', 'signup', 'contact', 'profile', 'customer-dashboard', 'shop-dashboard', 'admin-dashboard'];
export function readRoute(search: string) {
  const params = new URLSearchParams(search);
  const shop = params.get('shop');
  const page = params.get('page');
  return { shop, page: shop ? 'shop-detail' : page && pages.includes(page) ? page : 'home' };
}
