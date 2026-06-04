import test from "../support/Fixture/pageObjects";
test.describe("Electronics Navigation Test Cases", () => {
  test("Verify navigation to electronics page", async ({ electronics }) => {
    await electronics.navigateToElectronicsPage();
  });

});