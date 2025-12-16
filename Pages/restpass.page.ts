import { Page, Locator} from "@playwright/test";   

export class  ResetpassPage{
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly Canselbtn:Locator;
    readonly RestPassword :Locator;
    readonly errorMessage: Locator;
    readonly emptyMessage: Locator;
  
    constructor (page:Page){
        this.page = page;
        this.usernameInput=page.locator('input[placeholder="Username"]');
        this.Canselbtn=page.locator('.orangehrm-forgot-password-button--cancel');
        this.RestPassword=page.locator('.orangehrm-forgot-password-button--reset');
        this.emptyMessage= page.locator('.oxd-input-group__message');
        

    }
    async goto() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode');
    }
    
    async resetpass(username: string){
        await this.usernameInput.fill(username);
        await this.RestPassword.click();
    }
    async clislcansel(){
        await this.Canselbtn.click();
    }
    getemptymessage():Locator{
      return this.emptyMessage;
    }

}