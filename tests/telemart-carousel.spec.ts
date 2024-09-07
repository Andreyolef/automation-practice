import { test, expect } from "@playwright/test";

test("Jira-01 Telemart carousel is scrolled and redirects to correct page", async ({
  page,
}) => {
  const banner3URL =
    "https://telemart.ua/ua/promotions/gift-assembly-service.html";

  await page.goto("https://telemart.ua/ua/");
  expect(
    (await page.locator(".swiper-on-main .swiper-wrapper a").all()).length
  ).toBeGreaterThan(2);
  await page
    .locator('//div[@aria-label="Next slide"]')
    .click({ clickCount: 2 });
  await page.locator('//a[@data-banner-position="3"]').click();
  await expect(page).toHaveURL(banner3URL);
});
