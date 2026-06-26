import {test, expect} from "@playwright/test"
import { LoginPage } from "../PageObjects/LoginPage"

test("Get all username from table", async ({page}) => {
    // Login using LoginObjects
    const loginInPage = new LoginPage(page);
    await loginInPage.doLogin('Admin','admin123')
    await expect(page.getByRole("link", {name:"Admin"})).toBeVisible()


    await page.getByRole("link",{name: 'Admin'}).click()
    await page.getByRole("navigation", {name:'Topbar Menu'}).getByText("User Management").click()
    await page.getByRole ("menuitem", {name:'Users'}).click()

    // get table
    const rows=page.getByRole('table').getByRole('row');
    const userNames: string[] = []
    const rowCount = await rows.count();
    console.log(rowCount)

    for(let i=1; i<rowCount;i++ ){
        const cell = rows.nth(i).getByRole('cell').nth(1)
        const username = await cell.textContent()

        if(username){
            userNames.push(username);
        }               
    }
    console.log(userNames);
})

test("Get Employ from table", async ({page}) => {
    const loginInPage = new LoginPage(page);
    await loginInPage.doLogin('Admin','admin123');
    await expect(page.getByRole("link", {name:"Admin"})).toBeVisible()

    // get table
    const rows = page.getByRole('table').getByRole('row');
    const userNames: string[] = [];
    const rowCount = await rows.count();
    console.log(rowCount)

    for(let i=1; i<rowCount;i++ ){
        const Employee = rows.nth(i).getByRole('cell').nth(3)
        const username = await Employee.textContent()

        if(username){
            userNames.push(username);
        }               
    }
    console.log(userNames);
})

 test("Select specific user to edit ", async ({page}) => {
    //Login Page
    const loginInPage = new LoginPage(page);
    await loginInPage.doLogin('Admin','admin123');
    await expect(page.getByRole("link", {name:"Admin"})).toBeVisible()

    // Navigate to Admin > User Management > User
    await page.getByRole("link",{name: 'Admin'}).click()
    await page.getByRole("navigation", {name:'Topbar Menu'}).getByText("User Management").click()
    await page.getByRole ("menuitem", {name:'Users'}).click()

   
    const userForEdition = "Admin"
    // get specifi user to edit
    const pencilEdit= page.getByRole("table").getByRole("row").nth(2)
    //.filter({hasText: userForEdit})
    .locator('//button//i[@class="oxd-icon bi-pencil-fill"]')
    //.locator('button')
    //.filter({has: page.locator("i.oxd-icon bi-pencil-fill")}) // identifica el Edit button  
    await pencilEdit.click() 
 
    //check the edited user  
    //Forma 1
    /* const currentUserName = await page.locator("//label[contains(.,'Username')]/parent::div/following-sibling::div/input").inputValue();
     expect(currentUserName).toEqual(userForEdition) */

    //forma2 , la mas recomedada
    expect(page.locator("//label[contains(.,'Username')]/parent::div/following-sibling::div/input")).toHaveValue(userForEdition)
 })

 
 
 test('Select a random user to edit except Admin', async({page}) =>{
    //Login Page
    const loginInPage = new LoginPage(page);
    await loginInPage.doLogin('Admin','admin123');
    await expect(page.getByRole("link", {name:"Admin"})).toBeVisible()

    // Navigate to Admin > User Management > User
    await page.getByRole("link",{name: 'Admin'}).click()
    await page.getByRole("navigation", {name:'Topbar Menu'}).getByText("User Management").click()
    await page.getByRole ("menuitem", {name:'Users'}).click()

    //from Table
     const rows = page.getByRole("table").getByRole("row")
     const countRows = await rows.count()
     const randomRow = Math.floor(Math.random()* (countRows))
     

    // const userToEdit = await rows.nth(randomUser).getByRole('cell').nth(1).innerText()
    const randonRow = rows.nth(randomRow)
    const userToEdition = await randonRow.getByRole('cell').nth(1).innerText();
     console.log(userToEdition)


    if (userToEdition !== 'Admin'){
        const editButton = randonRow.locator('//button//i[@class="oxd-icon bi-pencil-fill"]')
        await editButton.click()
        expect(page.locator("//label[contains(.,'Username')]/parent::div/following-sibling::div/input")).toHaveValue(userToEdition)
    }
    
 })
 
