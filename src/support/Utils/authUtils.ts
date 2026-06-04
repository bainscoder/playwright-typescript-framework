import { Page } from "@playwright/test";
import { LoginPage } from "../PageMethod/login";

export async function ensureAuthenticated(page: Page) {

  const loginPage = new LoginPage(page);

  await page.goto("/");

  const loggedIn = await loginPage.isUserLoggedIn();

  if (!loggedIn) {

    console.log("Session expired. Re-authenticating...");

    await loginPage.reAuthenticate();
  }
}