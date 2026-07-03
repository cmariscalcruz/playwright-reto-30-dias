import {test as setup, expect} from '@playwright/test'
import { LoginPage } from '../PageObjects/LoginPage'



setup('Authentication as Admin', async ({page}) => {

    console.log('Autenticación iniciada usando el setup')

    // Iniciar sesion
    const loginPage = new LoginPage(page)
    await loginPage.loginAsAdmin()

    //Nos aseguramos que el inicio de sesion es exitoso
    await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible()

    // Guardar el estado del login
    await page.context().storageState({path:'.auth/admin.json'})

    console.log('Autenticación completada usando el setup')

})

/*
setup('authentication as Employee', async ({page}) => {

    console.log('Autentication iniciada usando el setup')

     //Iniciar sesion
      const loginPage = new LoginPage(page)
      loginPage.loginASCM()

      //nos  aseguramos que el inicio de session fue exitoso
      await expect(page.getByRole('link',{name:'Admin'})).toBeVisible()

      // Guardar el estado
      await page.context().storageState({path: '.auth/employee.json'})
      console.log('Autenticacion completada usando el setup')
})
      */