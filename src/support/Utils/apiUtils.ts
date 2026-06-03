import { Page, expect, Response } from "@playwright/test";

export async function validateApiResponse(
  page: Page,
  apiEndpoint: string): Promise<Response> {
  const response = await page.waitForResponse(response =>response.url().includes(apiEndpoint));
  console.log(`${apiEndpoint} API Status: ${response.status()}`);
  expect(response.status()).toBe(200);
  return response;
}