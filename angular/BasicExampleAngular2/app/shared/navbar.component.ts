import{Component} from '@angular/core';


@Component({
    selector:'cntg-nav-bar',
    templateUrl:'./navbar.component.html',
    styleUrls:['./navbar.component.css']
})

export class NavBarComponent{
    opciones:string[];

    constructor(){
        this.opciones=['Admin','Clients','External'];
    }

}