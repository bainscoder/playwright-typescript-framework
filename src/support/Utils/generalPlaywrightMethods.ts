import { Page, Locator, expect } from "@playwright/test";

export async function inputField(locator: Locator, str: string) {
  await locator.waitFor({ state: "visible", timeout: 60000 });
  await locator.fill(str);
  await expect(locator).toHaveValue(str);
}

export async function clickWebElement(locator: Locator, str?: string) {
  await locator.waitFor({ state: "visible", timeout: 60000 });
  if (str) {
    await expect(locator).toHaveText(str);
  }
  await locator.click();
}

export async function goToPage(page: Page, url: string) {
  await page.goto(url);
  await page.waitForLoadState("networkidle");
  await page.waitForLoadState("domcontentloaded");
}

export async function visibilityOfElement(locator: Locator, text?: string) {
  await expect(locator).toBeVisible({ timeout: 90000 });
  if (text) {
    let textValue = await locator.textContent();
    expect(textValue?.trim()).toContain(text);
  }
}

export async function assertPageUrl(page: Page, urlEndPoint: string) {
  const currentUrl = page.url();
  await expect(currentUrl).toContain(urlEndPoint);
}
