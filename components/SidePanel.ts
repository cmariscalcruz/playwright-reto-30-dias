import {Page, Locator, expect} from "@playwright/test"

export class SidePanel {
     readonly page : Page
     readonly searchtextbox : Locator

     constructor (page: Page){
        this.page = page
        this.searchtextbox = page.getByRole('textbox', {name:'Search'})
     }

     //CREATE A PRIVATE METHO TO LOCATOR DINAMICALLY
     private menuOption (option: SideMenuOption):Locator{
        return this.page.getByRole('link', {name:option})
    } 
    async clickOnOption (option : SideMenuOption) {
        await this.menuOption(option).click()
    }

    async searchOption (option : SideMenuOption){
        await this.searchtextbox.fill(option)
        expect(this.searchtextbox).toHaveValue(option)
        
        console.log(option)
        //expect(page.locator("//label[contains(.,'Username')]/parent::div/following-sibling::div/input")).toHaveValue(userToEdition)
    }


}

export enum SideMenuOption {
    ADMIN = 'Admin',
    PIM = 'PIM',
    LEAVE = 'Leave',
    TIME = 'Time',
    RECRUITMENT= 'Recruitment',
    MY_INFO='My Info',
    PERFORMANCE = 'Performance',
    DASHBOARD = 'Dashboard',
    DIRECTORY= 'Directory',
    MAINTENACE ='Maintenance',
    CLAIM ='Claim',
    BUZZ='Buzz'



}