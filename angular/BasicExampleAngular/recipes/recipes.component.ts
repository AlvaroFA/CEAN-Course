import { Component, OnInit, OnDestroy } from '@angular/core';
import { Receta } from './model/receta.model';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Dificultad } from './model/receta.model';



import { RecipesService } from './services/recipes.service';


@Component({
    selector: 'cntg-recipelist',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy {
    recetas: Observable<Receta[]>;
    subscription: Subscription;
    ngOnDestroy() {
        this.recetas = null;
        this.subscription.unsubscribe();
    }
    ngOnInit() {
        //this.recetas=this.recetasService.getRecipes();
        //this.subscription = this.recetasService.recetasState.subscribe((data: Receta[]) => {
        // this.recetas= data;
        //  });

        //implementacion del suscribe para la peticion async
        //  this.recetasService.getRecipesAsync().subscribe((recetasData: Receta[]) => {
        //this.recetas = recetasData;
        //  });

        this.recetas = this.recetasService.getRecetasByNode();

    }


    addRecipe() {
        let r = new Receta("cochinillo", 2, Dificultad.Alta, "sdasda", "imagen", [{ nombre: 'sadsa' }]);
        this.recetasService.updateReceta(r);
    }
    verResultado(res) {
        console.log(`el resultado es ${res}`);
    }
    constructor(private recetasService: RecipesService) {
        // this.recetas= recetasService.getRecipes();
    }
}