import { test, expect } from '@playwright/test';

test('homepage has correct title', async ({ page }) => {
  await page.goto('/');
  
  // Check page title
  await expect(page).toHaveTitle(/DDF Layouts/);
});

test('homepage has navigation elements', async ({ page }) => {
  await page.goto('/');
  
  // Check for navbar
  await expect(page.locator('nav')).toBeVisible();
  
  // Check for footer
  await expect(page.locator('footer')).toBeVisible();
});

test('homepage displays layouts table', async ({ page }) => {
  await page.goto('/');
  
  // Check for table element - using first table in main
  await expect(page.locator('main table').first()).toBeVisible();
});
