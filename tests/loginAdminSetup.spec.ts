import{test,expect } from "@playwright/test"
import { LoginPage } from "../PageObjects/LoginPage";
import { SideMenuOption, SidePanel } from "../components/SidePanel";

test("LoginSetup", async ({page}) =>{
    
    // Login using LoginObjects
   /* const loginPage = new LoginPage(page)
    await loginPage.loginAsAdmin()
    await expect(page.getByRole('link',{name:'Admin'})).toBeVisible() */
    
     await page.goto("/web/index.php/dashboard/index")

    const sidePanel = new SidePanel(page)
    // await sidePanel.clickOnOption(SideMenuOption.SEARCH)
    await sidePanel.clickOnOption(SideMenuOption.ADMIN)
    await sidePanel.clickOnOption(SideMenuOption.TIME)
    await sidePanel.clickOnOption(SideMenuOption.PERFORMANCE)
})
