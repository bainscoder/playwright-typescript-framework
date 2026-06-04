import { test as baseTest, Page } from "@playwright/test";
import { LoginPage } from "../PageMethod/login";
import { ElectronicsPage } from "../PageMethod/electronics";
import { ensureAuthenticated } from "../Utils/authUtils";
import { CartPage } from "../PageMethod/cartPage";

type Fixtures = {
  page: Page;
  login: LoginPage;
  electronics: ElectronicsPage;
  cart: CartPage;
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
  cart: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  }

});

export default test;