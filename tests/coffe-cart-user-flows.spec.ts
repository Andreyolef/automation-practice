import { test, expect, Locator } from "@playwright/test";

const coffeeUrl = "https://coffee-cart.app/";

test.beforeEach(async ({ page }) => {
  await page.goto(coffeeUrl);
});

test("AO-1 Cart counter is updated on add and delete actions", async ({
  page,
}) => {
  const cartCounter: Locator = page.locator('#app [aria-label="Cart page"]');
  const espressoAddCup: Locator = page.locator('[data-test="Espresso"]');
  const deleteButton: Locator = page.locator(".delete");

  await expect(cartCounter).toContainText("(0)");
  await espressoAddCup.click();
  await expect(cartCounter).toContainText("(1)");
  await cartCounter.click();
  await deleteButton.click();
  await expect(cartCounter).toContainText("(0)");
});

test("AO-2 Add items to the cart", async ({ page }) => {
  const cartCounter: Locator = page.locator('#app [aria-label="Cart page"]');
  const espressoAddCup: Locator = page.locator('[data-test="Espresso"]');
  const mochaAddCup: Locator = page.locator('[data-test="Mocha"]');
  const checkout: Locator = page.locator('[data-test="checkout"]');

  await espressoAddCup.click();
  await mochaAddCup.click();
  await expect(cartCounter).toContainText("(2)");
  await expect(checkout).toContainText("Total: $18.00");
});

test("AO-3 Delete items from cart page", async ({ page }) => {
  const espressoAddCup: Locator = page.locator('[data-test="Espresso"]');
  const mochaAddCup: Locator = page.locator('[data-test="Mocha"]');
  const cartItem: Locator = page.locator('#app [aria-label="Cart page"]');
  const removeAllEspressoButton: Locator = page.locator(
    '[aria-label="Remove all Espresso"]'
  );
  const checkoutButton: Locator = page.getByLabel("Proceed to checkout");
  const removeAllMochaButton: Locator = page.getByLabel("Remove all Mocha");
  const emptyCartMessage: Locator = page.getByText("No coffee, go add some.");

  await espressoAddCup.click();
  await mochaAddCup.click();
  await cartItem.click();
  await expect(removeAllEspressoButton).toBeVisible();
  await removeAllEspressoButton.click();
  await expect(checkoutButton).toContainText("Total: $8.00");
  await removeAllMochaButton.click();
  await expect(emptyCartMessage).toBeVisible();
});

test("AO-4 Get payment bill", async ({ page }) => {
  const mochaAddCup: Locator = page.locator('[data-test="Mocha"]');
  const cartPage: Locator = page.getByLabel("Cart page");
  const proceedToCheckoutButton: Locator = page.getByLabel(
    "Proceed to checkout"
  );
  const nameField: Locator = page.getByLabel("Name");
  const emailField: Locator = page.getByLabel("Email");
  const submitButton: Locator = page.getByRole("button", { name: "Submit" });
  const successMessage: Locator = page.locator(".snackbar.success");

  await mochaAddCup.click();
  await cartPage.click();
  await expect(proceedToCheckoutButton).toBeVisible();
  await proceedToCheckoutButton.click();
  await nameField.fill("Andrii");
  await emailField.fill("AO@gmail.com");
  await submitButton.click();
  await expect(successMessage).toBeVisible();
});

test("AO-5 Discounted coffee is added to cart", async ({ page }) => {
  const mochaAddCup: Locator = page.locator('[data-test="Mocha"]');
  const espressoAddCup: Locator = page.locator('[data-test="Espresso"]');
  const cappuccinoAddCup: Locator = page.locator('[data-test="Cappuccino"]');
  const yesDiscountButton: Locator = page.locator(".yes");
  const cartPage: Locator = page.getByLabel("Cart page");
  const discountedCoffee: Locator = page.locator(
    '//div[text()="(Discounted) Mocha"]'
  );

  await espressoAddCup.click();
  await mochaAddCup.click();
  await cappuccinoAddCup.click();
  await yesDiscountButton.click();
  await cartPage.click();
  await expect(discountedCoffee).toBeVisible();
});

test("AO-6 Update quantity of items in the cart", async ({ page }) => {
  const espressoAddCup: Locator = page.locator('[data-test="Espresso"]');
  const cartPage: Locator = page.getByLabel("Cart page");
  const addOneEspresso: Locator = page.getByRole("button", {
    name: "Add one Espresso",
  });
  const twoCupsCoffeeText: Locator = page.locator(
    '//span[text()="$10.00 x 2"]'
  );
  const deleteOneEspresso: Locator = page.getByRole("button", {
    name: "Remove one Espresso",
  });
  const oneCupCoffeeText: Locator = page.locator('//span[text()="$10.00 x 1"]');
  const price: Locator = page.locator(".pay");

  await espressoAddCup.click();
  await cartPage.click();
  await addOneEspresso.click();
  await expect(twoCupsCoffeeText).toBeVisible();
  await deleteOneEspresso.click();
  await expect(oneCupCoffeeText).toBeVisible();
  await expect(price).toContainText("Total: $10.00");
});
