import{test, expect} from "@playwright/test"
import { LoginPage } from "../PageObjects/LoginPage"
import { SideMenuOption, SidePanel } from "../components/SidePanel"

test ("Login with POM and linking in all options from sidePanel", async ({page}) =>{
    const pageLogin = new LoginPage(page)
    await pageLogin.doLogin('Admin','admin123')

     // call tu sidePanel
    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(SideMenuOption.ADMIN)
    await sidePanel.clickOnOption(SideMenuOption.PIM)
    await sidePanel.clickOnOption(SideMenuOption.LEAVE)
    await sidePanel.clickOnOption(SideMenuOption.TIME)
    await sidePanel.clickOnOption(SideMenuOption.RECRUITMENT)
    await sidePanel.clickOnOption(SideMenuOption.MY_INFO)
    await sidePanel.clickOnOption(SideMenuOption.PERFORMANCE)
    await sidePanel.clickOnOption(SideMenuOption.DASHBOARD)
    await sidePanel.clickOnOption(SideMenuOption.DIRECTORY)
    await sidePanel.clickOnOption(SideMenuOption.CLAIM)
    await sidePanel.clickOnOption(SideMenuOption.BUZZ)
    await sidePanel.clickOnOption(SideMenuOption.MAINTENACE)
})

test("Check 'Search' filters the option", async ({page}) => {
     const pageLogin = new LoginPage(page)
    await pageLogin.doLogin('Admin','admin123')

    const searchInput = new SidePanel(page);
    await searchInput.searchOption(SideMenuOption.ADMIN)
      
})