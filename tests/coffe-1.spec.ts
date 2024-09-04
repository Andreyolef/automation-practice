import {test, expect} from '@playwright/test';

test.beforeEach( async({page})=>{
    await page.goto('https://coffee-cart.app/')
})

test('AO-1 Cart counter is updated on add and delete actions', async({page})=>{
    await expect(page.locator('#app [aria-label="Cart page"]')).toContainText('(0)')
    await page.locator('[data-test="Espresso"]').click()
    await expect(page.locator('#app [aria-label="Cart page"]')).toContainText('(1)')
    await page.locator('#app [aria-label="Cart page"]').click()
    await page.locator('.delete').click()
    await expect(page.locator('#app [aria-label="Cart page"]')).toContainText('(0)')
})

test('AO-2 Add items to the cart', async({page})=>{
    await page.locator('[data-test="Espresso"]').click()
    await page.locator('[data-test="Mocha"]').click()
    await expect(page.locator('#app [aria-label="Cart page"]')).toContainText('(2)')
    await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $18.00')
})

test('AO-3 Delete items from cart page', async({page})=>{
    await page.locator('[data-test="Espresso"]').click()
    await page.locator('[data-test="Mocha"]').click()
    await page.locator('#app [aria-label="Cart page"]').click()
    await expect (page.locator('[aria-label="Remove all Espresso"]')).toBeVisible()
    await page.locator('[aria-label="Remove all Espresso"]').click()
    await expect (page.getByLabel('Proceed to checkout')).toContainText('Total: $8.00')
    await page.getByLabel('Remove all Mocha').click()
    await expect (page.getByText('No coffee, go add some.')).toBeVisible()

})

test('AO-4 Get payment bill', async({page})=>{
    await page.locator('[data-test="Mocha"]').click()
    await page.getByLabel('Cart page').click()
    await expect (page.getByLabel('Proceed to checkout')).toBeVisible()
    await page.getByLabel('Proceed to checkout').click()
    await page.getByLabel('Name').fill('Andrii')
    await page.getByLabel('Email').fill('AO@gmail.com')
    await page.getByRole('button', { name: 'Submit' }).click()
    await expect (page.locator('.snackbar.success')).toBeVisible()
})

test('AO-5 Discounted coffee is added to cart', async({page})=>{
    await page.locator('[data-test="Espresso"]').click()
    await page.locator('[data-test="Mocha"]').click()
    await page.locator('[data-test="Cappuccino"]').click()
    await page.locator('.yes').click()
    await page.getByLabel('Cart page').click()
    await expect(page.locator('//div[text()="(Discounted) Mocha"]')).toBeVisible()
} )

test('AO-6 Update quantity of items in the cart', async({page})=>{
    await page.locator('[data-test="Espresso"]').click()
    await page.getByLabel('Cart page').click()
    await page.getByRole('button', { name: 'Add one Espresso' }).click()
    await expect(page.locator('//span[text()="$10.00 x 2"]')).toBeVisible()
    await page.getByRole('button', { name: 'Remove one Espresso' }).click()
    await expect(page.locator('//span[text()="$10.00 x 1"]')).toBeVisible()
    await expect(page.locator('.pay')).toContainText('Total: $10.00')
})