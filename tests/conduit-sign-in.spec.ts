import { test, expect, Locator } from "@playwright/test";

test("SI-1 Invalid password or username message", async ({ page }) => {
  const conduitURL = "https://demo.learnwebdriverio.com/";
  const signInButton: Locator = page.locator('//a[@href="/login"]');
  const emailField: Locator = page.locator('//input[@placeholder="Email"]');
  const passwordField: Locator = page.locator(
    '//form/fieldset/input[@type = "password"]'
  );
  const submitSignInButton: Locator = page.locator("//button");
  const errorMessage: Locator = page.locator('//ul[@class="error-messages"]');

  await page.goto(conduitURL);
  await signInButton.click();
  await emailField.fill("nonexist@gm.com");
  await passwordField.fill("5465");
  await submitSignInButton.click();
  await expect(errorMessage).toContainText("email or password is invalid");
});
