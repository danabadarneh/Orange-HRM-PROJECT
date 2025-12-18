import { Page, Locator, expect } from '@playwright/test';

export class BuzzPage {
  readonly page: Page;

  // Header
  readonly buzzHeader: Locator;

  // Post actions
  readonly postButton: Locator;
  readonly sharePhotosButton: Locator;
  readonly shareVideoButton: Locator;

  // Tabs
  readonly recentTab: Locator;
  readonly likedTab: Locator;
  readonly commentedTab: Locator;

  // Post Card
  readonly postCard: Locator;
  readonly postAuthor: Locator;
  readonly timepost: Locator;
  readonly postContent: Locator;
  readonly postTextarea:Locator;
  // Icons
  readonly likeIcon: Locator;
  readonly commentIcon: Locator;
  readonly shareIcon: Locator;
  readonly anniversaryTitle:Locator;
  constructor(page: Page) {
    this.page = page;
    this.anniversaryTitle = page.locator('.orangehrm-buzz-anniversary-title');
  
    this.buzzHeader = page.locator('.oxd-topbar-header-breadcrumb-module');
    this.postTextarea = page.locator('textarea');
    this.postButton = page.locator('button.oxd-button--main:has-text("Post")');

    this.sharePhotosButton = page.locator('button:has-text("Share Photos")');
    this.shareVideoButton = page.locator('button:has-text("Share Video")');

    this.recentTab = page.locator('.orangehrm-post-filters button').nth(0);
    this.likedTab = page.locator('.orangehrm-post-filters button').nth(1);
    this.commentedTab = page.locator('.orangehrm-post-filters button').nth(2);

    this.postCard = page.locator('.orangehrm-buzz-post').first();
    this.postAuthor = this.postCard.locator('.orangehrm-buzz-post-header-text');
    this.postContent = this.postCard.locator('.orangehrm-buzz-post-body-text');

    this.likeIcon = this.postCard.locator('i.bi-heart-fill');
    this.commentIcon = this.postCard.locator('i.bi-chat-dots-fill');
    this.shareIcon = this.postCard.locator('i.bi-share-fill');
  }

  async openBuzz() {
    await this.page.click('a[href="/web/index.php/buzz/viewBuzz"]');
    await expect(this.page).toHaveURL(/buzz\/viewBuzz/);
  }

  async verifyPageLoaded() {
    await expect(this.buzzHeader).toBeVisible();
  }
  async createPost(text: string) {
    await this.postTextarea.fill(text);
    await this.postButton.click();
  
    await expect(this.page.locator('.orangehrm-buzz-post-body-text', {hasText: text,}).first()).toBeVisible({ timeout: 30000 });
  }
}
