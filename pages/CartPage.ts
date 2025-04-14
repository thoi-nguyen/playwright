import { Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly cartIcon = ".shopping_cart_link";
  readonly cartItems = ".cart_item";

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToCart() {
    await this.page.click(this.cartIcon);
  }

  async getCartItems() {
    return this.page.locator(this.cartItems).count();
  }
}
