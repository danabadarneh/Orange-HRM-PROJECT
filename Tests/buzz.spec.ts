import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/login.page';
import { BuzzPage } from '../Pages/buzz.page';

test.describe('Orange HRM – Buzz Page', () => {
  let login: LoginPage;
  let buzz: BuzzPage;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    buzz = new BuzzPage(page);

    await login.goto();
    await login.login('Admin', 'admin123');
    await buzz.openBuzz();
  });

  test('Verify Buzz Page Loads Successfully', async ({ page }) => {
    await buzz.verifyPageLoaded();
    await page.screenshot({ path: 'screenshots/verify-buzz-page-load.png',fullPage: true });
  });

  test('Verify Post Button Visibility', async ({ page }) => {
    await expect(buzz.postButton).toBeVisible();
    await page.screenshot({ path: 'screenshots/verify-post-button.png' ,fullPage: true});
  });

  test('Verify Share Photos Button', async ({ page }) => {
    await expect(buzz.sharePhotosButton).toBeVisible();
    await expect(buzz.sharePhotosButton).toBeEnabled();
    await page.screenshot({ path: 'screenshots/verify-share-photos.png' ,fullPage: true});
  });

  test('Verify Share Video Button', async ({ page }) => {
    await expect(buzz.shareVideoButton).toBeVisible();
    await expect(buzz.shareVideoButton).toBeEnabled();
    await page.screenshot({ path: 'screenshots/verify-share-video.png' ,fullPage: true});
  });

  test('Verify Buzz Tabs (Recent / Liked / Commented)', async ({ page }) => {
    await expect(buzz.recentTab).toBeVisible();
    await buzz.recentTab.click();
    await expect(buzz.likedTab).toBeVisible();
    await buzz.likedTab.click();
    await expect(buzz.commentedTab).toBeVisible();
    await buzz.commentedTab.click();
    await page.screenshot({ path: 'screenshots/verify-buzz-tabs.png' ,fullPage: true});
  });

  test('Verify new post text appears on Buzz page', async ({ page }) => {
  const postText = 'Automation Post Test';

  await buzz.createPost(postText);
  await expect(page.locator('.orangehrm-buzz-post-body-text', { hasText: postText,}).first()).toBeVisible({ timeout: 30000 });
  await page.screenshot({path: 'screenshots/verify-post-text.png',fullPage: true});
});

test('Verify Upcoming Anniversaries Section Title', async ({ page }) => {
  await buzz.anniversaryTitle.scrollIntoViewIfNeeded();
  await expect(buzz.anniversaryTitle).toBeVisible({ timeout: 10000 });
  await expect(buzz.anniversaryTitle).toHaveText(/Upcoming Anniversaries/i);
  await page.screenshot({path: 'screenshots/upcoming-anniversaries-title.png',fullPage: true});
});  
});
