import { test, expect } from '@playwright/test'

test.describe('Engineering Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000')
  })

  test('should display calculator interface', async ({ page }) => {
    // Check display shows 0 initially
    await expect(page.locator('[class*="Display_value"]')).toHaveText('0')
    
    // Check key buttons are visible
    await expect(page.getByRole('button', { name: '+' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'sin' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'cos' })).toBeVisible()
  })

  test('should perform basic addition', async ({ page }) => {
    await page.getByRole('button', { name: '2' }).click()
    await page.getByRole('button', { name: '+' }).click()
    await page.getByRole('button', { name: '3' }).click()
    await page.getByRole('button', { name: '=' }).click()
    
    await expect(page.locator('[class*="Display_value"]')).toHaveText('5')
  })

  test('should perform scientific calculations', async ({ page }) => {
    await page.getByRole('button', { name: '9' }).click()
    await page.getByRole('button', { name: '0' }).click()
    await page.getByRole('button', { name: 'sin' }).click()
    
    // sin(90°) should be 1
    await expect(page.locator('[class*="Display_value"]')).toHaveText('1')
  })

  test('should clear display', async ({ page }) => {
    await page.getByRole('button', { name: '5' }).click()
    await page.getByRole('button', { name: 'C', exact: true }).click()
    
    await expect(page.locator('[class*="Display_value"]')).toHaveText('0')
  })

  test('should handle decimal numbers', async ({ page }) => {
    await page.getByRole('button', { name: '3' }).click()
    await page.getByRole('button', { name: '.' }).click()
    await page.getByRole('button', { name: '1', exact: true }).click()
    await page.getByRole('button', { name: '4' }).click()
    
    await expect(page.locator('[class*="Display_value"]')).toHaveText('3.14')
  })
})