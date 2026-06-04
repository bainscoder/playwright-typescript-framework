import { test as setup } from "@playwright/test";
import { LoginPage } from "../support/PageMethod/login";

setup("authenticate", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.loginWithValidCredentials();
  await page.context().storageState({
    path: "src/auth/user.json",
  });
});