 import {Locator, Page} from "@playwright/test"

 export class OrganizationMenu {
    private readonly page: Page;
    private readonly organization : Locator;
    private readonly generalinformationOption : Locator;
    private readonly locationsOption : Locator;
    private readonly structureOption : Locator;


    constructor (page: Page){
        this.page = page;
        this.organization = page.getByRole("navigation", {name:'Topbar Menu'}).getByText("Organization");
        this.generalinformationOption = page.getByRole ("menuitem", {name:'General Information'});
        this.locationsOption = page.getByRole ("menuitem", {name:'Locations'});
        this.structureOption = page.getByRole ("menuitem", {name:'Structure'});
    }

    private async clickOnOrganization (){
        await this.organization.click()
    }

    async clickOnGeneralInformation (){
        await this.clickOnOrganization();
        await this.generalinformationOption.click()
    }

    async clickOnLocations (){
        await this.clickOnOrganization();
        await this.locationsOption.click()
    }
    async clickOnStructure (){
        await this.clickOnOrganization();
        await this.structureOption.click()
    }
    


 }
    

 