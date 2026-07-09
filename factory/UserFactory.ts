// creara direntes tipos de objetos

import { UserModel } from "../models/UserModel";


export class UserFactory {
      // permite crear un objeto por defecto
    private static defaultPassword = 'Passowrd123!';

  
    // permite sobre escribir las diferentes propiedades
    /**
     * Partcial es un utilitario que permite traer todas 
     * las opciones de  ese objeto en opcionales
     * es  decir que puedo pasarlas o no
     * */
    private static base(overrides? : Partial<UserModel>): UserModel {
        const defaults: UserModel = {
            username: 'user-' + crypto.randomUUID().slice(0,5),
            employee: 'Default employee,',
            password: this.defaultPassword,
            confirmpassword: this.defaultPassword,
            role:'ESS',
            status: 'Enabled',
        };
        return {...defaults, ...(overrides || {})}
    }

    //Se crea otro metodo para usar el metodo base
    static createEmployeeESS (overrides?: Partial<UserModel>){
        return  this.base ({role:'ESS', ...(overrides || {})})
    }
    static createAdmin (overrides?: Partial<UserModel>){
        return  this.base ({role:'Admin', ...(overrides || {})})
       
    }

    static createDisableAdmin (overrides?: Partial<UserModel>){
        return  this.base ({role:'Admin', status: 'Disable',...(overrides || {})})
       
    }
}