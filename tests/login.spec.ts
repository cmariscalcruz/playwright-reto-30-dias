import{test, expect} from "@playwright/test"
import { LoginPage } from "../PageObjects/LoginPage"
import { SideMenuOption, SidePanel } from "../components/SidePanel"

test("Login to hrm", async ({page}) => {
    await page.goto ('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    await page.getByRole('textbox', {name:'Username'}).fill('Admin')
    await page.getByRole('textbox', {name:'Password'}).fill('admin123')
    await page.getByRole('button',{name: 'Login'}).click()
    // Validar que estamos dentro de la pagina
    await expect(page.getByRole('link',{name:'Admin'})).toBeVisible()
})

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

test("Invalid login to hrm", async ({page}) => {
     test.slow(); // Easy way to triple the default timeout
  // ...

    await page.goto ('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    await page.getByRole('textbox', {name:'Username'}).fill('123')
    await page.getByRole('textbox', {name:'Password'}).fill('abc')
    await page.getByRole('button',{name: 'Login'}).click()

    //all locators work
    //const invalidMessage = await page.locator('p.oxd-alert-content-text').innerText()
    //const invalidMessage= await page.locator("//div[@role='alert']/div/p").innerText();   
    const invalidMessage = await page.getByRole("alert").getByRole("paragraph").innerText()
    expect (invalidMessage).toEqual('Invalid credentials')
    console.log(invalidMessage)
})
