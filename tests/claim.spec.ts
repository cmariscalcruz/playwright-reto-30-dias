import {test, expect} from "@playwright/test"
import { LoginPage } from "../PageObjects/LoginPage"
import { SideMenuOption, SidePanel } from "../components/SidePanel";

test("Check Captures all Amouns ", async ({page}) =>{
    const loginPage = new LoginPage(page)
    await loginPage.loginAsAdmin();
    //navigate to Clain option 
    const claimOption = new SidePanel(page)
    await claimOption.clickOnOption(SideMenuOption.CLAIM)
    //Get all rows from table
    
    
    // Get header row
     const allRows = page.getByRole('table').getByRole('rowgroup').nth(1).getByRole('row')
     const countRows = await allRows.count()
     console.log("Number of columns:", countRows)
    const amounts: number[] =[];

    for (let i=0; i < countRows ; i++){
        const amountCell = allRows.getByRole('cell').nth(7);
        const amountText = await amountCell.innerText();
        console.log("This is amount", amountText )

        if (amountText === null){
            continue;
        }
        const convertedNumber = parseFloat(amountText?.replace(/,/g, '').trim())
         amounts.push(convertedNumber)
    }
    console.log(amounts)
    
    // Suma  de amount
    let totalAmount = 0;
    for (let amount of amounts){
        totalAmount += amount;
    }
    console.log("Suma de amount", totalAmount)

    // Avarege de amount
    let averageAmount = 0;
    for (let amountAv of amounts){
        averageAmount += amountAv/countRows;
    }
    console.log("Average of amount", averageAmount)

    //Max y Min de amount
   
    const minimoAmount = Math.min.apply(null, amounts)
    console.log("Minimo amount", averageAmount)
    const maxAmount = Math.max.apply(null, amounts)
    console.log("Amximo amount", averageAmount)
})