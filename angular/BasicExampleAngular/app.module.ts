import {NgModule} from '@angular/core';
import{BrowserModule} from '@angular/platform-browser';
import{HttpModule} from '@angular/http';

import{ErrorComponent} from './error/error.component';
import{RecipesComponent} from './recipes/recipes.component';
import{AppComponent} from './start/app.component';
import{RecipesService} from './recipes/services/recipes.service';
import {RecipeItemComponent} from './recetaItem/recetaItem.component';

@NgModule({
    imports:[
         BrowserModule,
         HttpModule
    ],
    declarations:[
        AppComponent,
        RecipesComponent,
        RecipeItemComponent

    ],
    bootstrap:[AppComponent],
    providers:[RecipesService]
})

export class AppModule{

}