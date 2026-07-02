import {test, expect} from "@playwright/test"
import { LoginPage } from "../PageObjects/LoginPage"
import { SideMenuOption, SidePanel } from "../components/SidePanel";
import { TopBarMenu } from "../Config/top-bar-menu/topbarmenu";


test.beforeEach( "Login to OrangeHRM page", async ({page}) =>{
    await page.goto ('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    await page.getByRole('textbox', {name:'Username'}).fill('Admin')
    await page.getByRole('textbox', {name:'Password'}).fill('admin123')
    await page.getByRole('button',{name: 'Login'}).click()
    // Validar que estamos dentro de la pagina
    await expect(page.getByRole('link',{name:'Admin'})).toBeVisible()
})

test("Get usernames from table", async ({page}) => {
    await page.getByRole("link",{name: 'Admin'}).click()
    await page.getByRole("navigation", {name:'Topbar Menu'}).getByText("User Management").click()
    await page.getByRole ("menuitem", {name:'Users'}).click()

    // get table
    const rows = page.getByRole("table").getByRole("row");
    const userNames: string[] = []
    const rowCount = await rows.count();
    console.log(rowCount)

    for(let i=1; i<rowCount; i++){
        const cell = rows.nth(i).getByRole('cell').nth(1)
        const username = await cell.textContent()

        if(username){
            userNames.push(username);
        }               
    }
    console.log(userNames);
})

test("Get users from table", async({page})=>{
    await page.getByRole("link",{name: 'Admin'}).click()
    await page.getByRole("navigation", {name:'Topbar Menu'}).getByText("User Management").click()
    await page.getByRole ("menuitem", {name:'Users'}).click()

    // get table
   // const rows = page.locator("//div[@class='oxd-table'][@class='oxd-table-row']")
   const rows = page.locator(".oxd-table-body .oxd-table-row")
    const rowCount = await rows.count();
    console.log(rowCount)
    
    const lista = await rows.allTextContents()
     console.log(lista)
})

 test ("Check Admin is filter into table", async ({page}) => {
        await page.getByRole("link",{name: 'Admin'}).click()
        await page.getByRole("navigation", {name:'Topbar Menu'}).getByText("User Management").click()
        await page.getByRole ("menuitem", {name:'Users'}).click()

        //Get the Admin users rows from table before filter 
        const allRows = page.getByRole('table').getByRole('row')
        const countRowsd = await allRows.count()
        console.log (countRowsd)

        const rowsTable = await page.locator("//div[@role='table']/div[@role='rowgroup']").count()
        console.log("number of rows" , rowsTable)

        const  table = page.getByRole('table').getByRole('rowgroup')
        const as= await table.count()
        console.log("number of " , as)

    })