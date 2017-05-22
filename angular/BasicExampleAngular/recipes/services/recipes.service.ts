import { Receta, Dificultad } from '../model/receta.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';




@Injectable()
export class RecipesService {
    recetasState = new Subject<Receta[]>();
    url: String = 'http://localhost:3001';

    recetas = [
      //  new Receta("cochinillo", 2, Dificultad.Alta, "sdasda", "imagen", [{ nombre: 'sadsa' }])
    ];

    getRecipes(): Receta[] {
        return this.recetas;
    }

    //usandos peticiones asincronas usando
    getRecipesAsync(): Observable<Receta[]> {
        return new Observable((obs) => {
            obs.next(this.recetas);
        });
    }

    getRecetasByNode(): Observable<Receta[]> {
        return this.http.get(`${this.url}/recetas`).map((res: Response) => {
            let recetas: Receta[] = <Receta[]>res.json();
            return recetas;
        })
    }

    updateReceta(r: Receta) {
        this.recetas.push(r);
        this.recetasState.next(this.recetas.slice());
    }
    constructor(private http: Http) {
        this.http = http;
    }

}