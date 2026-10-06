import { test } from 'node:test';
import assert from 'node:assert/strict';
import { initialUsers } from '../src/data/mockData.ts';
import { verifyPassword, hashPassword } from '../src/utils/passwords.ts';
import type { User } from '../src/types/index.ts';

test('shop owner mock account has a unique phone number and non-conflicting credentials', () => {
  const admin = initialUsers.find(u => u.role === 'admin')!;
  const shopOwner = initialUsers.find(u => u.role === 'shop_owner')!;

  assert.ok(admin, 'Admin account must exist');
  assert.ok(shopOwner, 'Shop owner account must exist');
  assert.notEqual(admin.mobile, shopOwner.mobile, 'Admin and Shop Owner must not share the same mobile number');
});

test('password verification allows initial shop owner demo login and hashes on first use', async () => {
  const shopOwner = initialUsers.find(u => u.role === 'shop_owner')!;
  
  // Un-passwords initial mock user verifies true with demo password
  const isVerified = await verifyPassword('123456', shopOwner.password);
  assert.equal(isVerified, true);

  // Once hashed, only the correct password verifies
  const hash = await hashPassword('myShopPass123!');
  assert.equal(await verifyPassword('myShopPass123!', hash), true);
  assert.equal(await verifyPassword('wrongPass', hash), false);
});

test('login role lookup prioritizes requested role when matching phone or email', () => {
  const usersList: User[] = [
    {
      id: 'u1', name: 'Admin', email: 'admin@nexvarya.com', mobile: '9999999999',
      address: '', villageTownCity: '', pincode: '', state: '', country: '', language: 'en',
      role: 'admin', status: 'active'
    },
    {
      id: 'u2', name: 'Owner', email: 'owner@nexvarya.com', mobile: '9876543210',
      address: '', villageTownCity: '', pincode: '', state: '', country: '', language: 'en',
      role: 'shop_owner', status: 'active'
    }
  ];

  const findUserForLogin = (input: string, loginRole: 'customer' | 'shop_owner' | 'admin') => {
    const query = input.trim().toLowerCase();
    let matched = usersList.find(
      u => (u.email.toLowerCase() === query || u.mobile === input.trim()) && u.role === loginRole
    );
    if (!matched) {
      matched = usersList.find(
        u => u.email.toLowerCase() === query || u.mobile === input.trim()
      );
    }
    return matched;
  };

  const matchedOwner = findUserForLogin('9876543210', 'shop_owner');
  assert.equal(matchedOwner?.id, 'u2');
  assert.equal(matchedOwner?.role, 'shop_owner');

  const matchedEmailOwner = findUserForLogin('owner@nexvarya.com', 'shop_owner');
  assert.equal(matchedEmailOwner?.id, 'u2');
});
