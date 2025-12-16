import { test, expect } from "@playwright/test";
import { ResetpassPage } from "../Pages/restpass.page";

test.describe('Orange HRM Reset Password Tests', () => {
  let resetpass: ResetpassPage;

  test.beforeEach(async ({ page }) => {
    resetpass = new ResetpassPage(page);
    await resetpass.goto();
  });

  test('reset password with valid username',async({page})=>{
    await resetpass.resetpass('Admin');
    await expect(page.locator('h6')).toContainText('Reset Password');
    await page.screenshot({
        path: 'screenshots/reset-password-valid-username.png', fullPage: true});
  });

  test('reset password with empty field',async({page})=>{
    await resetpass.resetpass('');
    await expect(resetpass.getemptymessage()).toHaveText('Required');
    await page.screenshot({path:'screenshots/empty usernameresetpass.png',fullPage:true});
  });

  test('reset password with invalid username',async({page})=>{
    await resetpass.resetpass('InvalidUser123');
    await expect(page.locator('h6')).toContainText('Reset Password');
    await page.screenshot({path:'screenshots/reset password with invalid username.png',fullPage:true});
  });
});
