import { Page, Locator, expect } from "@playwright/test";
import { clickWebElement } from "../Utils/generalPlaywrightMethods";
import { validateApiResponse } from "../Utils/apiUtils";

export class ElectronicsPage {

  private readonly page: Page;
  private readonly electronicsTab: Locator;
  private readonly cellPhonesCategory: Locator;
  private readonly firstProduct: Locator;
  private readonly productPrice: Locator;
  private readonly addToCartButton: Locator;
  private readonly successNotification: Locator;

  constructor(page: Page) {

    this.page = page;
    this.electronicsTab = page.getByRole("link", {name: "Electronics",}).first();
    this.cellPhonesCategory = page.locator(".sub-category-grid .item-box .title").last();
    this.firstProduct = page.locator(".product-item .product-title a").first();
    this.productPrice = page.locator('[itemprop="price"]');
    this.addToCartButton = page.getByRole("button", {name: "Add to cart",}).first();
    this.successNotification = page.locator(".content");
  }

  /**
   * Navigate to Electronics Page
   */
  async navigateToElectronicsPage(): Promise<void> {
    await this.page.goto("/");
    const responsePromise = validateApiResponse(this.page, "/electronics");
    await clickWebElement(this.electronicsTab);
    await responsePromise;
    await expect(this.page).toHaveURL(/electronics/);
  }

  /**
   * Open Cell Phones Category
   */
  async openCellPhonesCategory(): Promise<void> {
    await this.navigateToElectronicsPage();
    const responsePromise = validateApiResponse(this.page,"/cell-phones");
    await clickWebElement(this.cellPhonesCategory);
    await responsePromise;
    await expect(this.page).toHaveURL(/cell-phones/);
  }

  /**
   * Open First Product
   */
  async openFirstProduct(): Promise<void> {
    await clickWebElement(this.firstProduct);
    await expect(this.page).toHaveURL(/smartphone/);
  }

  /**
   * Get Product Price
   */
  async getProductPrice(): Promise<number> {
    const priceText = await this.productPrice.textContent();
    return Number(
      priceText?.replace("$", "").trim()
    );
  }

  /**
   * Add Product To Cart
   */
  async addFirstProductToCart(): Promise<void> {
    await clickWebElement(this.addToCartButton);
    await expect(this.successNotification).toContainText("The product has been added to your shopping cart");
  }

  /**
   * Verify Product Added Successfully
   */
  async verifyProductAddedToCart(): Promise<void> {
    await expect(this.successNotification).toBeVisible();
  }

  /*
 * Network logger utility used only for API discovery/debugging.
 * It captures all network requests triggered after user actions
 * to identify the actual API endpoint for validation.
 *
 * Commented out because it is not required for regular execution
 * and may generate unnecessary logs in reports/terminal output.
 * Enable only while identifying APIs.
 */
//   async navigateToElectronicsPage() {
//     captureNetworkLogs(this.page,{
//       ignoreStaticFiles:true
//    });
//    await clickWebElement(
//       this.electronicsTab
//    );
//}
}