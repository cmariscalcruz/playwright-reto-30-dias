import * as dotenv from 'dotenv';

export class Environment {
    static readonly ADMIN_USERNAME = Environment.getRequired('ADMIN_USERNAME')
    static readonly ADMIN_PASSWORD = Environment.getRequired('ADMIN_PASSWORD')

    static readonly CM_USERNAME = Environment.getRequired('CM_USERNAME')
    static readonly CM_PASSWORD = Environment.getRequired('CM_PASSWORD')

    private static getRequired (key: string): string {
        const value =  process.env[key] 

        if(!value){
            throw  new Error ('Environment variable ' + key +  ' does not exit')
        }

        return value
    }
}