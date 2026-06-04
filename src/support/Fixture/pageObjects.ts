import { test as baseTest, Page } from "@playwright/test";
import { LoginPage } from "../PageMethod/login";
import { ElectronicsPage } from "../PageMethod/electronics";
import { ensureAuthenticated } from "../Utils/authUtils";

type Fixtures = {
  page: Page;
  login: LoginPage;
  electronics: ElectronicsPage;
};

const test = baseTest.extend<Fixtures>({
  login: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  electronics: async ({ page }, use) => {
    await ensureAuthenticated(page);
    const electronicsPage = new ElectronicsPage(page);
    await use(electronicsPage);
  },

});

export default test;