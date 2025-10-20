import { expect, test } from "@playwright/test";

import { routeWithUuid, uiLogin } from "./utils";

test.describe("Preview", () => {
  test("shows profile full name based on Profile Details", async ({ page }) => {
    await uiLogin(page);

    await page.goto("/ProfileDetails");

    await page.getByTestId("first-name-input").fill("Playwright");
    await page.getByTestId("last-name-input").fill("User");

    await page.getByRole("button", { name: /save/i }).click();

    await page.getByRole("link", { name: /preview/i }).click();

    await expect(page).toHaveURL(routeWithUuid("Preview"));
  });
});
