import {test, expect} from "@playwright/test"
import { LoginPage } from "../PageObjects/LoginPage"


test.beforeEach( "Login to OrangeHRM page", async ({page}) =>{
   const loginInPage = new LoginPage(page);
   await loginInPage.doLogin('Admin','admin123');
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
          }
         
         else {
             await menuItem.click()
         }
        
     }

})

test("Check all the Qualification link ", async ({page})=>{
    // un arreglo con los URL de la navegacion
    const expectedPages = [
        {
            menu: 'skills',
            url: 'web/index.php/admin/viewSkills'
        },
        {
            menu: 'Education',
            url: 'web/index.php/admin/viewEducation'
        },
        {
            menu: 'Licenses',
            url: 'web/index.php/admin/viewLicenses'
        },
        {
            menu:'Languages',
            url:'web/index.php/admin/viewLanguages'
        },
        {
            menu: 'Memberships',
            url: '/web/index.php/admin/membership'
        }
    ]
    // Navigate to Admin> Qualifications
      await page.getByRole('link',{name:'Admin'}).click()
      await page.getByRole("navigation", {name:'Topbar Menu'}).getByText('Qualifications ').click()
      
      // obtine todos  las optiones desde el menu
      const qualificationOptions= page.getByRole("menu").locator('li')
      
      //itera sobre cada  qualifications Options
      for(let expectedPage of expectedPages ){
        const menuOption = qualificationOptions.filter({hasText: expectedPage.menu})
        await menuOption.click()

        //regExp es una expresion que obtine solo una parte del texto que esta en la url
        await expect(page).toHaveURL(new RegExp(expectedPage.url)) 

        //Vuelve a la opcion Qualification 
        await page.getByRole("navigation", {name:'Topbar Menu'}).getByText('Qualifications ').click()
      }

    })

    test("Check all Organization links", async ({page}) =>{
        // creo un alista de las opciones desde Organizations
        const expectedPages = [
            {
                menu: 'General Information',
                url: 'web/index.php/admin/viewOrganizationGeneralInformation'
            },
             {
                menu: 'Locations',
                url: 'web/index.php/admin/viewLocations'
            },
             {
                menu: 'Structure',
                url: 'web/index.php/admin/viewCompanyStructure'
            }
        ]

        // Navegar a Admin> Organizations Options
         await page.getByRole("navigation", {name:"Sidepanel"}).getByRole("link",{name:"Admin"}).click()
        await page.getByRole("navigation",{name:"Topbar Menu"}).getByText("Organization").click()

        // get options from Organization
        const menuOrganization = page.getByRole("menu").locator("li")
         
        //for compara cada option seleccionada con al URL experada
        for(let expectedPage of expectedPages){
            const menuOption = menuOrganization.filter({hasText: expectedPage.menu});
            await menuOption.click();
            await expect(page).toHaveURL(new RegExp(expectedPage.url))

            //click on Organization option again
             await page.getByRole("navigation",{name:"Topbar Menu"}).getByText("Organization").click()


            

        }
      
    })