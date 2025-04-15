import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";
import { CartPage } from "../pages/CartPage";

const testData = [
  {
    username: "standard_user",
    password: "secret_sauce",
    item: "sauce-labs-backpack",
  },
  {
    username: "standard_user",
    password: "secret_sauce",
    item: "sauce-labs-bike-light",
  },
];

test.describe("SauceDemo Tests", () => {
  test("Login with invalid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login("invalid_user", "invalid_password");
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain("Username and password do not match");
  });

  testData.forEach(({ username, password, item }) => {
    test(`Login with valid credentials and add item (${item}) to cart`, async ({
      page,
    }) => {
      const loginPage = new LoginPage(page);
      const productsPage = new ProductsPage(page);
      const cartPage = new CartPage(page);

      // Login
      await loginPage.navigate();
      await loginPage.login(username, password);
      await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

      // Add item to cart
      await productsPage.addItemToCart(item);

      // Navigate to cart and verify item
      await cartPage.navigateToCart();
      const cartItemCount = await cartPage.getCartItems();
      expect(cartItemCount).toBe(1); // Assert that one item is added
    });
  });
});
