import{test, expect} from "@playwright/test"
import { LoginPage } from "../PageObjects/LoginPage"

test("Login to hrm using variable environment", async ({page}) => {
    const loginPage = new LoginPage(page)
    await loginPage.loginAsAdmin()
    // Validar que estamos dentro de la pagina
    //await expect(page.getByRole('link',{name:'Admin'})).toBeVisible()
})

test("Login with user different to ADMIN", async ({page}) => {
    const pageLogin = new LoginPage(page)
    await pageLogin.loginASCM()

    await expect(page.getByRole("navigation", {name: "Sidepanel"}).getByRole("link", {name:"Admin"})).toBeHidden()



})