 import {Locator, Page} from "@playwright/test"

 export class QualificationsMenu {
    private readonly page : Page;
    private readonly qualifications : Locator;
    private readonly skillsOption : Locator;
    private readonly educationOption : Locator;
    private readonly licensesOption: Locator;
    private readonly languagesOption : Locator;
    private readonly membershipsOption: Locator;

    constructor (page : Page) {
        this.page = page;
        this.qualifications = page.getByRole("navigation", {name:'Topbar Menu'}).getByText("Qualifications")
        this.skillsOption = page.getByRole ("menuitem", {name:'Skills'})
        this.educationOption = page.getByRole ("menuitem", {name:'Education'})
        this.licensesOption = page.getByRole ("menuitem", {name:'Licenses'})
        this.languagesOption = page.getByRole ("menuitem", {name:'Languages'})
        this.membershipsOption = page.getByRole ("menuitem", {name:'Memberships'})
    }

    private async clickOnQualificatiosn (){
        await this.qualifications.click()
    }

    async clickOnSkills (){
        await this.clickOnQualificatiosn();
        await this.skillsOption.click()
    }

    async clickOnEducations (){
        await this.clickOnQualificatiosn();
        await this.educationOption.click()
    }

    async clickOnLicenses (){
        await this.clickOnQualificatiosn();
        await this.licensesOption.click()
    }

    async clickOnLanguages (){
        await this.clickOnQualificatiosn();
        await this.languagesOption.click()
    }

    async clickOnMemberships (){
        await this.clickOnQualificatiosn();
        await this.membershipsOption.click()
    }

 }