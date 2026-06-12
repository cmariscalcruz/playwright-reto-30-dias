import {test, expect} from "@playwright/test"


test.beforeEach( "Login to OrangeHRM page", async ({page}) =>{
    await page.goto ('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    await page.getByRole('textbox', {name:'Username'}).fill('Admin')
    await page.getByRole('textbox', {name:'Password'}).fill('admin123')
    await page.getByRole('button',{name: 'Login'}).click()
    // Validar que estamos dentro de la pagina
    await expect(page.getByRole('link',{name:'Admin'})).toBeVisible()
})

test("Check left menu options", async ({page})=>{
    const leftMenuItems = page.getByLabel("Sidepanel").getByRole('listitem')
    const currentMenuItemsCount = await leftMenuItems.count()
    console.log(currentMenuItemsCount)

    const currentMenuItems: string [] = [];

    for (let i=0; i<currentMenuItemsCount; i++){
        const menuText = await leftMenuItems.nth(i).innerText()
        // added each item to list
        currentMenuItems.push(menuText)

    }
    console.log(currentMenuItems)

    // It is used to compare using asertion

    const expectedMenuItems = [
        'Admin',
        'PIM',
        'Leave',
        'Time',
        'Recruitment', 
        'My Info',
        'Performance', 
        'Dashboard',
        'Directory',
        'Maintenance',
        'Claim',
        'Buzz'
         
    ]
    
// compare each item menu
    expect(currentMenuItems).toEqual(expectedMenuItems)

    //Compare if first item menu is Admin
 
    const firstMenuItem = await leftMenuItems.nth(0).innerText();
    await expect(firstMenuItem).toEqual('Admin');
    console.log(firstMenuItem)
    
    page.pause();
})

test("Navigate through the left panel", async ({page})=>{
     const leftMenuItems = page.getByLabel('Sidepanel').getByRole('listitem')
     const currentMenuItemsCount = await leftMenuItems.count();
     console.log(currentMenuItemsCount)

     for (let i=0; i<currentMenuItemsCount; i++){
        const menuItem = leftMenuItems.nth(i);
        const menuText = await menuItem.innerText();
        console.log("Current menu item:", menuText);
        
        // Click on each menu ietm expected in 
        //if(menuText !== 'Maintenance') {
         //  await menuItem.click()
       //  }

         if(menuText === 'Maintenance'){
            
           await page.goBack()
           await leftMenuItems.nth(10).click()
           }
         
         else {
             await menuItem.click()
         }
        
     }

})