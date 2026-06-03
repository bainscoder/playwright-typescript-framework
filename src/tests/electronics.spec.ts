import test from "../support/Fixture/pageObjects";

test.describe("Electronics Navigation Test Cases",() => {
test.beforeEach(async ({ login }) => {
await login.navigateToLoginPage();
await login.loginWithValidCredentials();
});

/*
 * [Electronics] Verify user navigates to electronics page and API response is 200
 */
test("Verify navigation to electronics page",async ({ electronics }) => {
await electronics.navigateToElectronicsPage();
});
});