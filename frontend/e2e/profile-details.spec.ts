import { expect, test } from "@playwright/test";

import { uiLogin } from "./utils";

test.describe("Profile Details", () => {
  test("user can update profile and values persist after reload", async ({
    page,
  }) => {
    await uiLogin(page);
    await page.goto("/ProfileDetails");

    const firstName = page.getByTestId("first-name-input");
    const lastName = page.getByTestId("last-name-input");
    const email = page.getByTestId("email-input");

    await firstName.fill("Playwright");
    await lastName.fill("User");
    await email.fill("demo@playwright.com");

    await page.getByRole("button", { name: /save/i }).click();

    await page.reload();

    await expect(firstName).toHaveValue("Playwright");
    await expect(lastName).toHaveValue("User");
    await expect(email).toHaveValue("demo@playwright.com");
  });

  test("shows validation errors for invalid email", async ({ page }) => {
    await uiLogin(page);
    await page.goto("/ProfileDetails");

    const email = page.getByTestId("email-input");
    await email.fill("invalid-email");
    await page.getByRole("button", { name: /save/i }).click();

    await expect(
      page.getByText(/invalid email|enter a valid email/i)
    ).toBeVisible();
  });
});
