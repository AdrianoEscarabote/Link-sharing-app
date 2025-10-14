import { expect, test } from "@playwright/test";

import { routeWithUuid, uiLogin } from "./utils";

test.describe("Navigation", () => {
  test("user can navigate between Profile Details, Links and Preview", async ({
    page,
  }) => {
    await uiLogin(page);

    await expect(page).toHaveURL("/ProfileDetails");

    await page.getByRole("link", { name: /links/i }).click();
    await expect(page).toHaveURL("/Links");

    await page.getByRole("link", { name: /preview/i }).click();
    await expect(page).toHaveURL(routeWithUuid("Preview"));

    await page.getByRole("link", { name: /back to editor/i }).click();

    await page.getByRole("link", { name: /profile details/i }).click();

    await expect(page).toHaveURL("/ProfileDetails");
  });

  test("visiting an unknown route shows not-found page", async ({ page }) => {
    await page.goto("/this/route/does/not/exist");
    await expect(
      page.getByText(/the page you are looking for does not exist/i)
    ).toBeVisible();
  });
});
