import {Locator, Page, expect} from "@playwright/test"
import { UserModel } from "../models/UserModel";

export class AddNewUserPage {
    private readonly page: Page;
    
    private readonly addButton: Locator; 
    private readonly saveButton: Locator;
    private readonly cancelButton: Locator;
    private readonly successMessage: Locator;

    private readonly userRoleDropdown : Locator;
    private readonly employeeNameInput: Locator;
    private readonly statusDropdown: Locator;
    private readonly userNameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly confirmPasswordInput : Locator;
    private readonly doNotMatchPassword: Locator;
    
    


    constructor(page:Page){
        this.page = page;
        this.addButton = page.getByRole('button').getByText('Add')
        this.saveButton= page.getByRole('button', {name: 'Save'})
        this.cancelButton = page.getByRole('button', {name: 'Cancel'})
        this.successMessage = page.locator('p.oxd-text--toast-message')
        
        this.userRoleDropdown= page.locator('div.oxd-grid-item--gutters').filter({has: page.getByText('User Role')}).locator('div.oxd-select-text-input')
        this.employeeNameInput= page.getByRole('textbox',{name:'Type for hints...'})
        this.statusDropdown = page.locator('div.oxd-grid-item--gutters').filter({has: page.getByText('Status')}).locator('div.oxd-select-text-input')
        this.userNameInput= page.locator('div.oxd-grid-item--gutters').filter({has: page.getByText('Username')}).getByRole('textbox')
        this.passwordInput= page.locator('div.oxd-grid-item--gutters').filter({has: page.getByText('Password',{exact: true})}).getByRole('textbox')
        this.confirmPasswordInput = page.locator('div.oxd-grid-item--gutters').filter({has: page.getByText('Confirm Password',{exact: true})}).getByRole('textbox')
        this.doNotMatchPassword = page.locator('div.oxd-grid-item--gutters').filter({has: page.getByText('Confirm Password',{exact: true})}).locator('span.oxd-input-field-error-message')
    
       }

    async clickAddButton (){
        await this.addButton.click()
    }

    async clickOnSaveButton(){
        await this.saveButton.click()
    }

    async clickOnCancelButton(){
        await this.cancelButton.click()
    }
    async confirmationMessage(){
        await expect(this.successMessage).toHaveText('Successfully Saved')
    }

    async selectUserRole(userRole :string){
        await this.userRoleDropdown.click()
        //await this.page.getByText(userRole,{exact:true}).click()
        await this.page.getByRole('option',{name:userRole}).click();
    }

    async employeeNameFill(employeename :string){
       await this.employeeNameInput.fill(employeename)
       await this.page.getByText(employeename, {exact: true}).click();
    }

    async selectStatus(status:string){
       await this.statusDropdown.click()
      await this.page.getByText(status,{exact:true}).click()
    }

    async enterUserName(username: string){
       await this.userNameInput.fill(username)
    }

    async enterPassword(password: string){
       await this.passwordInput.fill(password)
    }

    async enterConfirmationPassword(confirmationpassword: string){
       await this.confirmPasswordInput.fill(confirmationpassword)
    }
    async validateConfirmationPassword (){
        await expect(this.doNotMatchPassword).toHaveText('Passwords do not match')
    }

    async addNewUser (user: UserModel){
    await this.clickAddButton()
    await this.selectUserRole(user.role);
    await this.employeeNameFill(user.employee)
    await this.selectStatus(user.status)
    await this.enterUserName(user.username)
    await this.enterPassword(user.password)
    await this.enterConfirmationPassword(user.confirmpassword)
    await this.clickOnSaveButton()
   }

   async invalidPassword (user: UserModel){
    await this.clickAddButton()
    await this.selectUserRole(user.role);
    await this.employeeNameFill(user.employee)
    await this.selectStatus(user.status)
    await this.enterUserName(user.username)
    await this.enterPassword(user.password)
    await this.enterConfirmationPassword(user.confirmpassword)
    await this.validateConfirmationPassword()
   }

   
}