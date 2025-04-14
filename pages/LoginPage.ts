import { Page } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();
const BASE_FE_URL = process.env.BASE_FE_URL;

export class LoginPage {
  readonly page: Page;
  readonly usernameInput = "#user-name";
  readonly passwordInput = "#password";
  readonly loginButton = "#login-button";
  readonly errorMessage = '[data-test="error"]';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    if (!process.env.BASE_FE_URL) {
      throw new Error(
        "BASE_FE_URL is not defined in the environment variables"
      );
    }
    await this.page.goto(process.env.BASE_FE_URL);
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async getErrorMessage() {
    return this.page.locator(this.errorMessage).textContent();
  }
}
