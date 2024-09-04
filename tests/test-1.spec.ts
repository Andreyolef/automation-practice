import { test, expect } from '@playwright/test';

test('Get Started button redirects to Installation page', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page.locator('a[class*="getStarted"]')).toBeVisible();
  await expect(page.locator('header .container')).toContainText('Get started');
  await page.locator('a[class*="getStarted"]') .click();
  await expect(page.locator('h1')).toContainText('Installation');
});


test('Main menu items are visible', async({page}) =>{
  await page.goto('https://playwright.dev/');
  await expect(page.locator('.navbar__items a:nth-child(3)')).toBeVisible();
  await expect(page.locator('.navbar__items a:nth-child(4)')).toBeVisible();
  await expect(page.locator('.dropdown--hoverable')).toBeVisible();
  await expect(page.locator('.navbar__items a:nth-child(6)')).toBeVisible();
  await expect(page.locator('div.navbar__items:nth-child(1)')).toContainText('Docs');
  await expect(page.locator('div.navbar__items:nth-child(1)')).toContainText('API');
  await expect(page.locator('div.navbar__items:nth-child(1)')).toContainText('Node.js');
  await expect(page.locator('div.navbar__items:nth-child(1)')).toContainText('Community');

})