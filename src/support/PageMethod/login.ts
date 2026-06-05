import { Page, Locator, expect } from "@playwright/test";
import data from "../TestData/data.json";
import { env } from "../Utils/env";
import {
  assertPageUrl,
  clickWebElement,
  inputField,
  visibilityOfElement,
} from "../Utils/generalPlaywrightMethods";

export class LoginPage {
  private page: Page;
  private loginLink: Locator;
  private loginButton: Locator;
  private heading: Locator;
  private errorMessage: Locator;
  private emailField: Locator;
  private passwordField: Locator;
  private logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginLink = page.locator('[href="/login"]');
    this.heading = page.getByText(data.returningCustomerHeading);
    this.loginButton = page.getByRole("button", { name: "Log in" });
    this.errorMessage = page.getByText(data.errorMessageOnLogin);
    this.emailField = page.locator("#Email");
    this.passwordField = page.locator("#Password");
    this.logoutLink = page.getByText(data.logoutText);
  }

  async navigateToLoginPage() {
    await this.page.goto("/");
    await clickWebElement(this.loginLink);
    await visibilityOfElement(this.heading);
  }

  async loginWithoutCredentials() {
    await clickWebElement(this.loginButton);
    await visibilityOfElement(this.errorMessage);
  }

  async loginWithValidCredentials() {
    await inputField(this.emailField, env.email);
    await inputField(this.passwordField, env.password);
    await clickWebElement(this.loginButton);
    await visibilityOfElement(this.logoutLink);
  }

  async isUserLoggedIn(): Promise<boolean> {
    try {
      return await this.logoutLink.isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  async reAuthenticate() {
    await this.navigateToLoginPage();
    await this.loginWithValidCredentials();
  }
}
