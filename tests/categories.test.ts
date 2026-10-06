import { test } from 'node:test';
import assert from 'node:assert/strict';
import { initialCategories, initialProducts, initialShops } from '../src/data/mockData.ts';
import type { Category } from '../src/types/index.ts';

test('all initial categories have valid IDs, English names, and Telugu translations', () => {
  assert.ok(initialCategories.length >= 10, 'Should have at least 10 predefined categories');
  const seenIds = new Set<string>();

  for (const cat of initialCategories) {
    assert.ok(cat.id, 'Category must have an ID');
    assert.ok(!seenIds.has(cat.id), `Category ID ${cat.id} must be unique`);
    seenIds.add(cat.id);

    assert.ok(cat.name && cat.name.trim().length > 0, `Category ${cat.id} must have a non-empty name`);
    assert.ok(cat.nameTe && cat.nameTe.trim().length > 0, `Category ${cat.id} must have a non-empty nameTe`);
    assert.ok(/[\u0C00-\u0C7F]/.test(cat.nameTe), `Category ${cat.id} nameTe must contain Telugu characters: ${cat.nameTe}`);
    assert.equal(cat.status, 'active', `Category ${cat.id} should be active`);
  }
});

test('every product references a valid active category', () => {
  const validCategoryIds = new Set(initialCategories.map(c => c.id));
  for (const product of initialProducts) {
    assert.ok(
      validCategoryIds.has(product.categoryId),
      `Product ${product.id} (${product.name}) has invalid categoryId: ${product.categoryId}`
    );
  }
});

test('every shop references a valid active category', () => {
  const validCategoryIds = new Set(initialCategories.map(c => c.id));
  for (const shop of initialShops) {
    assert.ok(
      validCategoryIds.has(shop.categoryId),
      `Shop ${shop.id} (${shop.businessName}) has invalid categoryId: ${shop.categoryId}`
    );
  }
});

test('category product and shop filtering return expected entities', () => {
  const groceryId = 'cat_grocery';
  
  const groceryShops = initialShops.filter(s => s.categoryId === groceryId);
  assert.ok(groceryShops.length > 0, 'Grocery category should have associated shops');

  const groceryProducts = initialProducts.filter(p => p.categoryId === groceryId);
  assert.ok(groceryProducts.length > 0, 'Grocery category should have associated products');

  for (const shop of groceryShops) {
    assert.equal(shop.categoryId, groceryId);
  }
  for (const product of groceryProducts) {
    assert.equal(product.categoryId, groceryId);
  }
});

test('localized category display resolves correctly for en and te languages', () => {
  const getCategoryDisplayName = (cat: Category, lang: 'en' | 'te') => {
    if (lang === 'te' && cat.nameTe) return cat.nameTe;
    return cat.name;
  };

  const grocery = initialCategories.find(c => c.id === 'cat_grocery')!;
  assert.equal(getCategoryDisplayName(grocery, 'en'), 'Grocery');
  assert.equal(getCategoryDisplayName(grocery, 'te'), 'కిరాణా');

  const fallbackCat: Category = {
    id: 'cat_custom',
    name: 'Custom Category',
    nameTe: '',
    icon: 'Grid',
    status: 'active'
  };
  assert.equal(getCategoryDisplayName(fallbackCat, 'te'), 'Custom Category');
});

test('new categories can be added dynamically with unique ID assignment', () => {
  const categoriesList = [...initialCategories];
  
  const addCategory = (catData: Omit<Category, 'id'>): Category => {
    const newCat: Category = {
      ...catData,
      id: 'cat_' + Math.random().toString(36).substring(2, 9)
    };
    categoriesList.push(newCat);
    return newCat;
  };

  const newCategory = addCategory({
    name: 'Organic Foods',
    nameTe: 'సేంద్రీయ ఆహారాలు',
    icon: 'Leaf',
    status: 'active',
    description: 'Fresh organic farm produce'
  });

  assert.ok(newCategory.id.startsWith('cat_'));
  assert.equal(categoriesList.length, initialCategories.length + 1);
  assert.equal(categoriesList.find(c => c.id === newCategory.id)?.name, 'Organic Foods');
});
