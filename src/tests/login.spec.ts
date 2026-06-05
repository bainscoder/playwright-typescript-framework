import test from "../support/Fixture/pageObjects";
test.describe("Login Test Cases", () => {
  test.beforeEach(async ({ login }) => {
    /*
     * [Login]: Verify that user navigated to login page
     */
    await login.navigateToLoginPage();
  });

  /*
   * [Login]: Verify the functionality of login button w.r.t blank fields
   */
  test("Verify the functionality of sign in button w.r.t blank fields", async ({
    login,
  }) => {
    await login.loginWithoutCredentials();
  });
});
