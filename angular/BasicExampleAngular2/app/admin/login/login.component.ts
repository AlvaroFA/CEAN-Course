import{Component} from '@angular/core';
import{Router} from '@angular/router';

import{UserService} from '../services/user.service';

@Component({
    selector:'cntg-login',
    templateUrl:'./login.component.html',
    styleUrls:['./login.component.css']
})
export class LoginComponent{
    
    isUserLogged:boolean;
    username:string;
    passwd:string;

    constructor(private router:Router, private userService:UserService){
        this.isUserLogged= false;
        this.username="user",
        this.passwd="1234"
        this.router=router;
        
    }

    login(){
        let result = this.userService.login(this.passwd);
        console.log(`${this.passwd},${this.username}`);
        if(result){
            this.router.navigate(['']);          
        }
    }

    cancel(){
    }
}