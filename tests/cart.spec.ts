import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';

// These tests start ALREADY logged in, thanks to the saved session.
test.describe('Cart', () => {
  test('adding a product shows 1 in the cart badge', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.open();

    await inventory.addToCart('sauce-labs-backpack');

    await expect(inventory.cartBadge).toHaveText('1');
  });

  test('removing the product hides the badge', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.open();

    await inventory.addToCart('sauce-labs-backpack');
    await inventory.removeFromCart('sauce-labs-backpack');

    await expect(inventory.cartBadge).toBeHidden();
  });
});
