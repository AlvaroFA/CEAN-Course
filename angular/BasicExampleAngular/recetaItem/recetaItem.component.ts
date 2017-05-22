import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RecipesComponent } from '../recipes/recipes.component';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Dificultad, Receta} from '../recipes/model/receta.model';


import { RecipesService } from './services/recipes.service';


@Component({
    selector: 'recipeItem',
    templateUrl: './recetaItem.component.html',
    styleUrls: ['./recetaItem.component.css']
})
export class RecipeItemComponent  {
    @Input()receta:Receta;

    @Output() 
    resultado= new EventEmitter<string>();

    emitirResultado(){
        this.resultado.emit("Resultado viene del componente RecetaItem");
    }
}