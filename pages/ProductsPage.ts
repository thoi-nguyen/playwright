import { Page } from "@playwright/test";

export class ProductsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addItemToCart(itemName: string) {
    const addToCartButton = `button[data-test="add-to-cart-${itemName}"]`;
    await this.page.click(addToCartButton);
  }
}
