
import {Locator, Page} from "@playwright/test"
export class JobMenu {
    private readonly page: Page;
    private readonly job : Locator;
    private readonly jobTitlesOption : Locator;
    private readonly payGradesOption : Locator;
    private readonly employmentStatusOption: Locator;
    private readonly jobCategoriesOption : Locator;
    private readonly jobWorkShiftsOption: Locator;

    constructor (page: Page){
        this.page = page;
        this.job = page.getByRole("navigation", {name:'Topbar Menu'}).getByText("Job")
        this.jobTitlesOption = page.getByRole ("menuitem", {name:'Job Titles'})
        this.payGradesOption = page.getByRole ("menuitem", {name:'Pay Grades'})
        this.employmentStatusOption = page.getByRole ("menuitem", {name:'Employment Status'})
        this.jobCategoriesOption = page.getByRole ("menuitem", {name:'Job Categories'})
        this.jobWorkShiftsOption = page.getByRole ("menuitem", {name:'Work Shifts'})
    }

    async clickOnJob (){
        await this.job.click()
    }

    async clickOnJobTitles (){
        await this.clickOnJob()
        await this.jobTitlesOption.click()
    }

    async clickOnPayGrades (){
        await this.clickOnJob()
        await this.payGradesOption.click()
    }
    async clickOnEmploymentStatus (){
        await this.clickOnJob()
        await this.employmentStatusOption.click()
    }
    async clickOnCategories (){
        await this.clickOnJob()
        await this.jobCategoriesOption.click()
    }
    async clickOnWorkShifts (){
        await this.clickOnJob()
        await this.jobWorkShiftsOption.click()
    }

}
