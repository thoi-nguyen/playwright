import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";
import { CartPage } from "../pages/CartPage";
import productItems from "../data/product-items.json";
import { getRandomIndex } from "../utils/random-data";
import dotenv from "dotenv";
dotenv.config();

test.describe("SauceDemo Tests", () => {
  let username = process.env.USERNAME ?? "";
  let password = process.env.PASSWORD ?? "";
  let invalid_user = process.env.INVALID_USER ?? "";
  let invalid_password = process.env.INVALID_PASSWORD ?? "";

  test("Login with invalid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(invalid_user, invalid_password);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain("Username and password do not match");
  });

  test("Login with valid credentials and add item", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    let item = productItems[getRandomIndex(productItems.length)].id;
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
