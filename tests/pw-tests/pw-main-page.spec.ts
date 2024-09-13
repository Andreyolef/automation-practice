import { test, expect, Locator } from "@playwright/test";

const playwrightUrl = "https://playwright.dev/";

test("Get Started button redirects to Installation page", async ({ page }) => {
  const buttonGetStarted: Locator = page.locator('a[class*="getStarted"]');
  const headerText: Locator = page.locator("header .container");
  const headerInstallation: Locator = page.locator("h1");

  await page.goto(playwrightUrl);
  await expect(buttonGetStarted).toBeVisible();
  await expect(headerText).toContainText("Get started");
  await buttonGetStarted.click();
  await expect(headerInstallation).toContainText("Installation");
});

test("Main menu items are visible", async ({ page }) => {
  const docsMenuItem: Locator = page.locator(".navbar__items a:nth-child(3)");
  const apiMenuItem: Locator = page.locator(".navbar__items a:nth-child(4)");
  const nodeJSMenuItem: Locator = page.locator(".dropdown--hoverable");
  const communityMenuItem: Locator = page.locator(
    ".navbar__items a:nth-child(6)"
  );
  const menuItemsList: Locator = page.locator("div.navbar__items:nth-child(1)");

  await page.goto(playwrightUrl);
  await expect(docsMenuItem).toBeVisible();
  await expect(apiMenuItem).toBeVisible();
  await expect(nodeJSMenuItem).toBeVisible();
  await expect(communityMenuItem).toBeVisible();
  await expect(menuItemsList).toContainText("Docs");
  await expect(menuItemsList).toContainText("API");
  await expect(menuItemsList).toContainText("Node.js");
  await expect(menuItemsList).toContainText("Community");
});
