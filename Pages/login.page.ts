
import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly emptyMassage :Locator;
  readonly forgotPasswordLink :Locator;
  readonly orangehrmlogo :Locator;
  readonly linkedLogo :Locator;
  readonly FacebookLogo :Locator;
  readonly twitterLogo: Locator;
  readonly youtubeLogo: Locator;
  readonly footer:Locator;
  readonly title :Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.errorMessage = page.locator('.oxd-alert-content-text');
    this.emptyMassage=page.locator('.oxd-input-group__message');
    this.forgotPasswordLink=page.locator('.orangehrm-login-forgot-header');
    this.linkedLogo=page.locator('a[href*="linkedin.com"]');
    this.FacebookLogo=page.locator('a[href*="facebook.com"]');
    this.twitterLogo = page.locator('a[href*="twitter.com"]');
    this.youtubeLogo = page.locator('a[href*="youtube.com"]');
    this.footer=page.locator('.orangehrm-login-footer-sm');
    this.orangehrmlogo=page.locator('.orangehrm-login-branding');
    this.title=page.locator('.oxd-text.oxd-text--h5.orangehrm-login-title');

  }
//class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"
  async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
  
  async clickforgotPassword (){
    await this.forgotPasswordLink.click();
  }

  getErrorMessage(): Locator {
    return this.errorMessage;
  }

  getEmptyMessage():Locator{
    return this.emptyMassage;
  }
  async clickLinkedInLogoAndVerify() {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.linkedLogo.click()
    ]);
    await newPage.waitForLoadState();
    expect(newPage.url()).toContain('linkedin.com');
  }
  
  async clickFacebookLogoAndVerify() {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.FacebookLogo.click()
    ]);
    await newPage.waitForLoadState();
    expect(newPage.url()).toContain('facebook.com');
  }
  async clicktwiterLogoAndVerify() {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.twitterLogo.click()
    ]);
    await newPage.waitForLoadState('load');
    expect(newPage.url()).toContain('x.com');
  }
  async clickYouTubeLogoAndVerify() {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.youtubeLogo.click()
    ]);
    await newPage.waitForLoadState();
    expect(newPage.url()).toContain('youtube.com');
  }

  
}