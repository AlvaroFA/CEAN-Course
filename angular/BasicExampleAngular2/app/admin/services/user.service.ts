import{Injectable} from '@angular/core';


//injeccion de dependencias
@Injectable()
export class UserService{

    constructor(){
    }

    // login service
    login(p:string):boolean{
        if(p === "1234"){
            return true
        }
        return false;
    }


}