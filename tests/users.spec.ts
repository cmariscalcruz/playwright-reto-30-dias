import {test, expect} from "@playwright/test"

/*
test.beforeEach( "Login to OrangeHRM page", async ({page}) =>{
    await page.goto ('https://opensource-demo.orangehrmlive.com')

    await page.getByRole('textbox', {name:'Username'}).fill('Admin')
    await page.getByRole('textbox', {name:'Password'}).fill('admin123')
    await page.getByRole('button',{name: 'Login'}).click()
    // Validar que estamos dentro de la pagina
    await expect(page.getByRole('link',{name:'Admin'})).toBeVisible()
})
*/
test("Get all username from table", async ({page}) => {
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

    await page.getByRole("link",{name: 'Admin'}).click()
    await page.getByRole("navigation", {name:'Topbar Menu'}).getByText("User Management").click()
    await page.getByRole ("menuitem", {name:'Users'}).click()

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
      await page.goto ('https://opensource-demo.orangehrmlive.com')

    await page.getByRole('textbox', {name:'Username'}).fill('Admin');
    await page.getByRole('textbox', {name:'Password'}).fill('admin123');
    await page.getByRole('button',{name: 'Login'}).click()

    // Navigate to Admin > User Management > User
    await page.getByRole("link",{name: 'Admin'}).click()
    await page.getByRole("navigation", {name:'Topbar Menu'}).getByText("User Management").click()
    await page.getByRole ("menuitem", {name:'Users'}).click()

    // Get rows  from table
     //const  rows = page.getByRole("table").getByRole("row");


    // declara una cosntante con en user especifico
    const userForEdit = "Admin"
   
    const pencilEdit  = 
    page.getByRole("table").getByRole("row") // filtra todos los rows de la table
    .filter({hasText: userForEdit})  // filtra el row con un user especifico
    .locator("button") // identifica los butones de action
    .filter({has: page.locator("i.bi-pencil-fill")}) // identifica el Edit button   
    .click()  // Hace la action click

    // desde Edited page
    const currentUserName = 
    await page.locator("label[contains(.,'Username')]/parent::div/following-sibling::div/input") // identidica el User texto box usando xpath
    .inputValue() // esta value  se saca de Accecibility  ya que ene l DOM no se muestra el valor

    // aqui se hace la asercion
    expect(currentUserName).toEqual(userForEdit);

    // otra forma de hacer usando 'toHaveValue()' que es la recomendada en Playwright
    expect(page.locator("label[contains(.,'Username')]/parent::div/following-sibling::div/input")).toHaveValue(currentUserName)
 })
