import { test } from '@playwright/test';
import { LoginPage } from '../Pages/login.page';
import { BuzzPage } from '../Pages/buzz.page';

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
  await buzz.openBuzz();
  await buzz.verifyPageLoaded();
});

