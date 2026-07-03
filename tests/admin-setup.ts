import{test as setup, expect} from "@playwright/test"
import { LoginPage } from "../PageObjects/LoginPage"

setup("Antentication as Admin", async({page}) =>{
    console.log("Autenticacion iniciando el setup")
    //Iniciar Sesion
    const loginPage = new LoginPage(page);
    await loginPage.loginAsAdmin()
    // Nos  aseguramos que el inicio de sessionsea exitosa
    await expect(page.getByRole("link",{name:"Admin"})).toBeVisible();

    await page.context().storageState({path:'.auth/admin.json'});
    console.log("Autenticacion completada usando el setup")
})