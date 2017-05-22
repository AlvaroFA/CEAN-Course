import{Component} from '@angular/core';


@Component({
    selector: 'cntg-home',
    templateUrl:'./home.component.html',
    styleUrls:['./home.component.css']
})

export class HomeComponent{
    direccion:string;

    constructor(){
        this.direccion='Rua percebe 13';
    }
}