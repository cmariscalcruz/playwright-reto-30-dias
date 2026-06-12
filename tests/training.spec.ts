import {test, expect} from '@playwright/test'
// page = fixture 
// await es una funcion que dice , espere antes que la otra funcion se jecute
test('Login Sauce demo', async ({page}) => {
    await page.goto('https://saucedemo.com')

    await page.getByRole('textbox', {name: 'Username'}).fill('standard_user')
    await page.getByRole('textbox', {name:'Password'}).fill('secret_sauce')
    await page.getByRole('button', {name: 'Login'}).click()

})