import { test, expect } from "@playwright/test";

test("Jira-01 Telemart carousel is scrolled and redirects to correct page", async ({
  page,
}) => {
  await page.goto("https://telemart.ua/ua/");

  const banner3URL = await page
    .locator('//a[@data-banner-position="3"]')
    .getAttribute("href");

  expect(
    (await page.locator(".swiper-on-main .swiper-wrapper a").all()).length
  ).toBeGreaterThan(2);
  await page
    .locator('//div[@aria-label="Next slide"]')
    .click({ clickCount: 2 });
  await page.locator('//a[@data-banner-position="3"]').click();
  await expect(page).toHaveURL(banner3URL);
});
