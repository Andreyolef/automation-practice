import {test, expect} from "@playwright/test";

test('SI-1 Invalid password or username message', async({page})=>{
    await page.goto('https://demo.learnwebdriverio.com/')
    await page.locator('//a[@href="/login"]').click()
    await page.locator('//form/fieldset/input[@type = "email"]').fill('nonexist@gm.com')
    await page.locator('//form/fieldset/input[@type = "password"]').fill('5465')
    await page.locator('//button').click()
    await expect (page.locator('//ul[@class="error-messages"]')).toContainText('email or password is invalid')
})