import{NgModule} from '@angular/core';
import{CommonModule} from '@angular/common';
import{FormsModule} from '@angular/forms';
import{AppRoutingModule} from './shared/app.routing';

import{LoginComponent} from './login/login.component';
import{RegistroComponent} from './registro/registro.component';
import{UserService} from './services/user.service';

@NgModule({
    imports:[
        CommonModule,
        FormsModule
    ],
    declarations:[
        RegistroComponent,
        LoginComponent
    ],
    exports:[LoginComponent],
    providers:[UserService]

})

export class AdminModule{

}