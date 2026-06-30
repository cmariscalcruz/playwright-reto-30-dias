import {Page, Locator} from "@playwright/test"

export class SidePanel {
     readonly page : Page

     constructor (page: Page){
        this.page = page
     }

     //CREATE A PRIVATE METHO TO LOCATOR DINAMICALLY
     private menuOption (option: SideMenuOption):Locator{
        return this.page.getByRole('link', {name:option})
    } 
    async clickOnOption (option : SideMenuOption) {
        await this.menuOption(option).click()
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