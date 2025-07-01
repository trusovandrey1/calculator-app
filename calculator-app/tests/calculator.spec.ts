import { test, expect } from '@playwright/test'

test.describe('Engineering Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/calculator')
  })

  test('should display calculator interface', async ({ page }) => {
    // Check display shows 0 initially
    await expect(page.locator('.font-mono').filter({ hasText: '0' })).toBeVisible()
    
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
    
    await expect(page.locator('.font-mono').filter({ hasText: '5' })).toBeVisible()
  })

  test('should perform scientific calculations', async ({ page }) => {
    await page.getByRole('button', { name: '9' }).click()
    await page.getByRole('button', { name: '0' }).click()
    await page.getByRole('button', { name: 'sin' }).click()
    
    // sin(90°) should be 1
    await expect(page.locator('.font-mono').filter({ hasText: '1' })).toBeVisible()
  })

  test('should clear display', async ({ page }) => {
    await page.getByRole('button', { name: '5' }).click()
    await page.getByRole('button', { name: 'C', exact: true }).click()
    
    await expect(page.locator('.font-mono').filter({ hasText: '0' })).toBeVisible()
  })

  test('should handle decimal numbers', async ({ page }) => {
    await page.getByRole('button', { name: '3' }).click()
    await page.getByRole('button', { name: '.' }).click()
    await page.getByRole('button', { name: '1', exact: true }).click()
    await page.getByRole('button', { name: '4' }).click()
    
    await expect(page.locator('.font-mono').filter({ hasText: '3.14' })).toBeVisible()
  })

  test('should support keyboard input', async ({ page }) => {
    await page.keyboard.press('5')
    await page.keyboard.press('+')
    await page.keyboard.press('3')
    await page.keyboard.press('Enter')
    
    await expect(page.locator('.font-mono').filter({ hasText: '8' })).toBeVisible()
  })

  test('should clear with Escape key', async ({ page }) => {
    await page.keyboard.press('5')
    await page.keyboard.press('Escape')
    
    await expect(page.locator('.font-mono').filter({ hasText: '0' })).toBeVisible()
  })
})