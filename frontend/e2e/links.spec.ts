import { expect, test } from "@playwright/test";

import { removeAllLinks, routeWithUuid, uiLogin } from "./utils";

test.describe("Links management", () => {
  test("user can add a new link and see it in Preview", async ({ page }) => {
    await uiLogin(page);
    await removeAllLinks(page);
    await page.getByRole("button", { name: /save/i }).click();

    await page.getByRole("button", { name: /add new link|add link/i }).click();

    await page
      .locator('[data-testid^="link-url-input-"]')
      .last()
      .fill("https://www.github.com/");

    await page.getByRole("button", { name: /save/i }).click();
    await page.getByRole("link", { name: /preview/i }).click();
    await expect(page).toHaveURL(routeWithUuid("Preview"));
    await expect(page.locator('a[href*="github.com"]')).toBeVisible();
  });

  test("user can add two links, remove one, and only remaining shows in Preview", async ({
    page,
  }) => {
    await uiLogin(page);
    await removeAllLinks(page);
    await page.getByRole("button", { name: /save/i }).click();

    await page.getByRole("button", { name: /add new link|add link/i }).click();
    await page
      .locator('[data-testid^="link-url-input-"]')
      .last()
      .fill("https://github.com/microsoft/playwright");

    await page.getByRole("button", { name: /add new link|add link/i }).click();
    await page
      .locator('[data-testid^="link-url-input-"]')
      .last()
      .fill("https://www.linkedin.com/in/test-user");

    await page.locator('[data-testid^="remove-link-"]').first().click();

    await page.getByRole("button", { name: /save/i }).click();
    await page.getByRole("link", { name: /preview/i }).click();
    await expect(page).toHaveURL(routeWithUuid("Preview"));
    await expect(
      page.locator('a[href*="linkedin.com/in/test-user"]')
    ).toBeVisible();
    await expect(
      page.locator('a[href*="github.com/microsoft/playwright"]')
    ).toHaveCount(0);
  });
});
