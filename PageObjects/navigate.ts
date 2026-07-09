import {Page} from "@playwright/test"

export class Navigate {
    private readonly page:Page;

    constructor(page:Page){
        this.page = page;
        
    }

    async toDasboard (){
        await this.page.goto('web/index.php/auth/login');
    }
}