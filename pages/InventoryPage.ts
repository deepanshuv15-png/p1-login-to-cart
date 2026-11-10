import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly title: Locator;
  readonly cartBadge: Locator;

  constructor(private readonly page: Page) {
    this.title = page.getByTestId('title');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
  }

  async open() {
    await this.page.goto('/inventory.html');
  }

  // 'sauce-labs-backpack' -> data-test="add-to-cart-sauce-labs-backpack"
  async addToCart(product: string) {
    await this.page.getByTestId(`add-to-cart-${product}`).click();
  }

  async removeFromCart(product: string) {
    await this.page.getByTestId(`remove-${product}`).click();
  }
}
