import {test, expect} from "@playwright/test";

test('HW-5 Create an article', async ({page})=>{
    const articleName = 'How to: XPath'
    const articleDescription = 'Using Xpath for Automation Tests'
    const articleContent = 'Use XPath to locate an element you want to interact with'
    const articleTags = 'Playwright Automation Test'

    await page.goto('https://demo.learnwebdriverio.com/')
    await page.locator('//*[@href="/login"]').click()
    await page.locator(`//input[@placeholder="Email"]`).fill('andrii@gmail.com')
    await page.locator(`//input[@placeholder="Password"]`).fill('12345678')
    await page.locator('//button[contains(text(),"Sign in")]').click()
    await page.locator('//a[@href="/editor"]').click()
    await page.locator('//input[@data-qa-id="editor-title"]').fill(`${articleName}`)
    await page.locator('//input[@data-qa-id="editor-description"]').fill(`${articleDescription}`)
    await page.locator('//div[contains(@class, "v-note-edit")]//textarea').fill(`${articleContent}`)
    await page.locator('//input[@data-qa-id="editor-tags"]').fill(`${articleTags}`)
    await page.locator('//button[@data-qa-id="editor-publish"]').click()
    await expect (page.locator('//h1')).toContainText(`${articleName}`)
    await expect (page.locator('//p')).toContainText(`${articleContent}`)




})