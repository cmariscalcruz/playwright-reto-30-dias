import{test, expect} from "@playwright/test"

test("Login to hrm", async ({page}) => {
    await page.goto ('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    await page.getByRole('textbox', {name:'Username'}).fill('Admin')
    await page.getByRole('textbox', {name:'Password'}).fill('admin123')
    await page.getByRole('button',{name: 'Login'}).click()
    // Validar que estamos dentro de la pagina
    await expect(page.getByRole('link',{name:'Admin'})).toBeVisible()
})


test("Invalid login to hrm", async ({page}) => {
     test.slow(); // Easy way to triple the default timeout
  // ...

    await page.goto ('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    await page.getByRole('textbox', {name:'Username'}).fill('123')
    await page.getByRole('textbox', {name:'Password'}).fill('abc')
    await page.getByRole('button',{name: 'Login'}).click()

    const invalidMessage = await page.locator('p.oxd-alert-content-text').innerText()
    expect (invalidMessage).toEqual('Invalid credentials')
    console.log(invalidMessage)
})