import {test, expect} from "@playwright/test"
import { LoginPage } from "../PageObjects/LoginPage"
import { SideMenuOption, SidePanel } from "../components/SidePanel";
import { TopBarMenu } from "../Config/top-bar-menu/topbarmenu";
import { log } from "node:console";
import { AddNewUserPage } from "../PageObjects/addnewuserpage";
import { UserModel } from "../Model/UserModel";

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

 test ('Check User Role option from Users', async ({page}) =>{
    const expectedUserRoleOptions = ['-- Select --', 'Admin', 'ESS']
     const loginPage = new LoginPage (page)
     await loginPage.loginAsAdmin()

     const sidePanel = new SidePanel(page)
    sidePanel.clickOnOption(SideMenuOption.ADMIN)
    
    const topbarMenu= new TopBarMenu(page)
    await topbarMenu.userManagement.clickOnUsers()

    

    await page.locator("//label[contains(.,'User Role')]/parent::div/following-sibling::div").click()
    const currentUserRoleOptions = await page.getByRole('listbox').getByRole('option').allInnerTexts()
    console.log(currentUserRoleOptions)
    expect(currentUserRoleOptions, 'The options displayed in teh User Role dropdown  do not match the expected optionn.').toEqual(expectedUserRoleOptions)
    })

    test ("Check Status Options from Users", async ({page}) =>{
       const expectedStatusOptions = [ '-- Select --', 'Enabled', 'Disabled' ]
        const loginPage = new LoginPage (page)
        await loginPage.loginAsAdmin()

        const sidePanel = new SidePanel(page)
        sidePanel.clickOnOption(SideMenuOption.ADMIN)
    
        const topbarMenu= new TopBarMenu(page)
        await topbarMenu.userManagement.clickOnUsers()

        await page.locator("//label[contains(.,'Status')]/parent::div/following-sibling::div").click()
        const currentStatusOptions = await page.getByRole('listbox').getByRole('option').allInnerTexts()
        console.log(currentStatusOptions)

        expect(currentStatusOptions, 'The options displayed in teh User Role dropdown  do not match the expected optionn.').toEqual(expectedStatusOptions)


    })

    test ("Test1: Filter by ADMIN user", async ({page}) => {
        const loginPage = new LoginPage (page)
        await loginPage.loginAsAdmin()

        const sidePanel = new SidePanel(page)
        sidePanel.clickOnOption(SideMenuOption.ADMIN)
    
        const topbarMenu= new TopBarMenu(page)
        await topbarMenu.userManagement.clickOnUsers()



        
        const allBodyRows= page.getByRole('table').getByRole('rowgroup').nth(1).getByRole('row')
        const countrows = await allBodyRows.count();
        console.log("number of rows", countrows)
        //Filas que contienen el Admon rol
        const currentAdminRows =  allBodyRows.filter({has: page.getByRole('cell').nth(2).getByText('Admin')})

        //Contar las files con Admin
         const expectedAdminRows = await currentAdminRows.count() 
         console.log('Admin users before filters:', expectedAdminRows)

        //Aplicar el filtro
        await page.locator("//label[contains(.,'User Role')]/parent::div/following-sibling::div").click()
        await page.getByRole('listbox').getByRole('option', {name : 'Admin'}).click()
        await page.getByRole('button', {name : 'Search'}).click()

        //La tabla filtrada  deberia  tener exactamente  la misma cantidad que encontramos
       await expect(allBodyRows).toHaveCount(expectedAdminRows)

       for (let i = 0 ; i< expectedAdminRows; i++){
        await expect(allBodyRows.nth(1).getByRole('cell').nth(2)).toContainText('Admin')
       }
    })

     test("Test2: Check filter Admin user rows", async({page}) => {
      // Login 
    await page.goto('https://opensource-demo.orangehrmlive.com/');
    await page.getByRole("textbox", {name:"Username"}).fill("Admin");
    await page.getByRole("textbox", {name: "Password"}).fill("admin123");
    await page.getByRole("button", {name:"Login"}).click();

    // Navigate to Admin > User Management > User
    await page.getByRole("link", {name:"Admin"}).click()
    await page.getByRole("navigation", {name:"Topbar Menu"}).getByText("User Management").click()
    await page.getByRole("menuitem", {name:"Users"}).click();

    // get Admin rows before filter from User Role dropdown
    const allBodyRows= page.getByRole('table').getByRole('rowgroup').nth(1).getByRole('row')
    const countrows = await allBodyRows.count();
    console.log("number of rows", countrows)
    //Filas que contienen el Admon rol
    const currentAdminRows =  allBodyRows.filter({has: page.getByRole('cell').nth(2).getByText('Admin')})
    const AdminCountCurrent = await currentAdminRows.count()
    console.log("AdminCountCurrent", AdminCountCurrent)
    

    //Aplicar el filtro
    await page.locator("//label[contains(.,'User Role')]/parent::div/following-sibling::div").click()
    await page.getByRole('listbox').getByRole('option', {name : 'Admin'}).click()
    await page.getByRole('button', {name : 'Search'}).click()

    const AdminCountExpected = await allBodyRows.count()
    console.log("AdminCountExpected", AdminCountExpected)

    expect(AdminCountExpected).toEqual(AdminCountCurrent)

})

test("Long Form: Add a new User", async ({page})=>{
    const userName = 'cris' + crypto.randomUUID()
    const employeeToSerach= 'Qwerty LName';
    const password = 'Or4cul0#963';

    //Login & Naviagte to Admin > User Management> Users
    const loginPage= new LoginPage(page)
    await loginPage.loginAsAdmin();
    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(SideMenuOption.ADMIN)
    const topbarMenu = new TopBarMenu(page)
    await topbarMenu.userManagement.clickOnUsers()

    //Navigate to Add User
    await page.getByRole('button',{name: 'Add'}).click()


    //Fill all fields with valid information
    //User Role
     await page.locator('div.oxd-grid-item oxd-grid-item--gutters')
     .filter({has: page.getByText('User Role')})
     .locator('div.oxd-select-text-input')
     .click()
     await page.getByText('ESS',{exact: true}).click()

     //Employee Name
     await page.getByRole('textbox',{name:'Type for hints...'}).fill(employeeToSerach)
     await page.getByText('Qwerty Qwerty LName').click();

    // Status
     await page.locator('div.oxd-grid-item oxd-grid-item--gutters')
     .filter({has: page.getByText('Status')})
     .locator('div.oxd-select-text-input')
     .click()
      await page.getByText('Enabled',{exact: true}).click()

    //User Name
    await page.locator('div.oxd-grid-item oxd-grid-item--gutters')
     .filter({has: page.getByText('Username', {exact: true})})
     .getByRole('textbox')
     .fill(userName)

     //Password & Confirm Password
     await page.locator('div.oxd-grid-item oxd-grid-item--gutters')
     .filter({has: page.getByText('Password', {exact:true})})
     .getByRole('textbox')
     .fill(password)

      await page.locator('div.oxd-grid-item oxd-grid-item--gutters')
     .filter({has: page.getByText('Confirm Password', {exact:true})})
     .getByRole('textbox')
     .fill(password)

    //Click on SAVE button
    await page.getByRole('button', {name:'Save'}).click()

    // Check added popup confirm is dipslayed
     await expect (page.locator('p.oxd-text--toast-message')).toHaveText('Successfully Saved')
})
test("Using POM: Add a new User", async ({page})=>{
    const userName = 'cris' + crypto.randomUUID()
    //const employeeToSerach= 'Qwerty LName';
    const employeeToSerach= 'bubu grey';
    const password = 'Or4cul0#963';

    //Login & Naviagte to Admin > User Management> Users
    const loginPage= new LoginPage(page)
    await loginPage.loginAsAdmin();
    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(SideMenuOption.ADMIN)
    const topbarMenu = new TopBarMenu(page)
    await topbarMenu.userManagement.clickOnUsers()

    // add New user
    const addnewUser = new AddNewUserPage (page)
    await addnewUser.clickAddButton();
    await addnewUser.selectUserRole('ESS');
    await addnewUser.employeeNameFill(employeeToSerach)
    await addnewUser.selectStatus('Enabled')
    await addnewUser.enterUserName(userName)
    await addnewUser.enterPassword(password)
    await addnewUser.enterConfirmationPassword(password)
    await addnewUser.clickOnSaveButton()
    await addnewUser.confirmationMessage()
})

test("Using Interface: Add a new User", async ({page})=>{
      const randomUserName = 'cris' + crypto.randomUUID()
    const employeeToSerach= 'bubu grey';
    const password = 'Or4cul0#963';

    //Login & Naviagte to Admin > User Management> Users
    const loginPage= new LoginPage(page)
    await loginPage.loginAsAdmin();
    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(SideMenuOption.ADMIN)
    const topbarMenu = new TopBarMenu(page)
    await topbarMenu.userManagement.clickOnUsers()

    const userToAdd: UserModel ={
        username: randomUserName,
        employee: employeeToSerach,
        status : 'Enabled',
        role: 'ESS',
        password:password,
        confirmpassword: password


    }

    // add a new user
    const addNewUser = new AddNewUserPage(page)
    await addNewUser.addNewUser(userToAdd)
    await addNewUser.confirmationMessage()

})