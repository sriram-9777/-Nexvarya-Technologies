import type { Order, SalesFilterPeriod } from '../types/index.ts';

export function filterSalesOrders(orders: Order[], period: SalesFilterPeriod, now = new Date()) {
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  switch (period) {
    case 'yesterday': start.setDate(start.getDate() - 1); end.setDate(end.getDate() - 1); break;
    case '7days': start.setDate(start.getDate() - 6); break;
    case '30days': start.setDate(start.getDate() - 29); break;
    case 'this_month': start.setDate(1); break;
    case 'last_month': end.setDate(1); start.setMonth(start.getMonth() - 1, 1); break;
  }
  return orders.filter(order => {
    const date = new Date(order.createdAt);
    return date >= start && date < end;
  });
}
