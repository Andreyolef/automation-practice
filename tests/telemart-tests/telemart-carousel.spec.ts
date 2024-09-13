import { test, expect, Locator } from "@playwright/test";

test("TM-01 Telemart carousel is scrolled and redirects to active banner", async ({
  page,
}) => {
  const telemartURL = "https://telemart.ua/ua";

  await page.goto(telemartURL);

  const allCarouselItemsLength: Number = (
    await page.locator(".swiper-on-main .swiper-wrapper a").all()
  ).length;
  const nextSlideButton: Locator = page.locator(
    '//div[@aria-label="Next slide"]'
  );
  const activeBanner = "a.swiper-slide.swiper-slide-active";

  expect(allCarouselItemsLength).toBeGreaterThan(2);
  await nextSlideButton.click({ clickCount: 2 });

  const bannerURLActive = await page.locator(activeBanner).getAttribute("href");

  await page.locator(activeBanner).click();

  expect(page.url()).toEqual(bannerURLActive);
});
