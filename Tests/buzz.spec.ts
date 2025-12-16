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
test('Create a new post via UI', async ({ page }) => {
  const postText = `Hello from Playwright ${Date.now()}`;
  await buzz.createPost(postText);
  await page.screenshot({path:'screenshots/Create a new post via UI.png'});
});
