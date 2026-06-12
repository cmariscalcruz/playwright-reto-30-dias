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
/*
1. textContent() es un metodo que saca el texto que  esta en el DOM independientemente si esta visible o no pra  el usuario
2. InnerText() es el metodo recomendado en playwright para sacar text es innerText, es cerca  ala realidad
*/