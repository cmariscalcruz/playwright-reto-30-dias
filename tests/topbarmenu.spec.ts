import {test, expect} from "@playwright/test"
import { LoginPage } from "../PageObjects/LoginPage"
import { TopBarMenu } from "../Config/top-bar-menu/topbarmenu";
import { SideMenuOption, SidePanel } from "../components/SidePanel";


test ("Navigate to UserManagement options", async ({page}) =>{
    const loginPage = new LoginPage(page);
    loginPage.loginAsAdmin();
    //await expect(page.getByRole('link',{name:'Admin'})).toBeVisible()

    const sidePanel = new SidePanel(page);
    await sidePanel.clickOnOption(SideMenuOption.ADMIN)

    const topbarMenu = new TopBarMenu(page);
    await topbarMenu.userManagement.clickOnUsers();

    await topbarMenu.job.clickOnJobTitles();
    await topbarMenu.job.clickOnPayGrades();
    await topbarMenu.job.clickOnEmploymentStatus();
    await topbarMenu.job.clickOnCategories();
    await topbarMenu.job.clickOnWorkShifts();


    await topbarMenu.organization.clickOnGeneralInformation();
     await topbarMenu.organization.clickOnLocations();
      await topbarMenu.organization.clickOnStructure();



    await topbarMenu.qualifications.clickOnSkills();
    await topbarMenu.qualifications.clickOnEducations();
    await topbarMenu.qualifications.clickOnLicenses();
    await topbarMenu.qualifications.clickOnLanguages();
    await topbarMenu.qualifications.clickOnMemberships();
   






   
})