import { expect, Page } from "@playwright/test";

export async function uiLogin(page: Page) {
  await page.goto("/Login");
  await page.getByTestId("email-input").fill("demo@playwright.com");
  await page.getByTestId("password-input").fill("password");
  await page.getByRole("button", { name: /login/i }).click();
  await expect(page).toHaveURL("/ProfileDetails");
}

export const routeWithUuid = (route: string) =>
  new RegExp(
    `\\/${route}\\/` +
      `[0-9a-fA-F]{8}-` +
      `[0-9a-fA-F]{4}-` +
      `[0-9a-fA-F]{4}-` +
      `[0-9a-fA-F]{4}-` +
      `[0-9a-fA-F]{12}` +
      `\\/?$`,
    "i"
  );
