import { Page, Locator, expect } from "@playwright/test";
import {clickWebElement } from "../Utils/generalPlaywrightMethods";
import { validateApiResponse } from "../Utils/apiUtils";
import { captureNetworkLogs } from "../Utils/networkLogger";

export class ElectronicsPage {
  private page: Page;
  private electronicsTab: Locator;

  constructor(page: Page) {
    this.page = page;
    this.electronicsTab = page.locator('[href="/electronics"]').first();
  }

  async navigateToElectronicsPage() {
  await this.page.goto("/");
  const responsePromise = validateApiResponse(this.page,"/electronics");
  await clickWebElement(this.electronicsTab);
  await responsePromise;
  await expect(this.page).toHaveURL(/electronics/);
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