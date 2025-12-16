import { Page, expect } from '@playwright/test';

export class BuzzPage {
  constructor(private page: Page) {}

  async openBuzz() {
    await this.page.click('a[href="/web/index.php/buzz/viewBuzz"]');
    await expect(this.page).toHaveURL(/buzz\/viewBuzz/);
  }

  async createPost(text: string) {

    const postCard = this.page.locator('.oxd-buzz-post');
    await expect(postCard).toBeVisible({ timeout: 15000 });
    await postCard.click();

    const textarea = this.page.locator('textarea');
    await expect(textarea).toBeVisible({ timeout: 15000 });
    await textarea.fill(text);

    const postBtn = this.page.locator('button[type="submit"]');
    await expect(postBtn).toBeEnabled();
    await postBtn.click();

    const firstPost = this.page.locator('.orangehrm-buzz-post').first();
    await expect(firstPost).toBeVisible({ timeout: 20000 });
  }
}
