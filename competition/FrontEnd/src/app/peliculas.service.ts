import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';   //trasnformar la respuesta del Response a una en JSON

import { Pelicula } from '../app/models/pelicula';

//Para hacer un servicio usar @Injectable (no existe un decorador que se llame service)
@Injectable()
export class PeliculasService {

    //Este array no tiene ningun mecanismo para informar de sus cambio
    peliculas: Array<Pelicula>;
    peliculasChanged = new Subject<Array<Pelicula>>(); //Subject para que pueda reflejar cambios en el array

    baseUrl: string = "http://localhost:3000";  //la ruta base del servidor NODE donde corre la app

    constructor(private http: Http) { //inyectamos el servicio Http que proporciona Angular para salir al exterior (back-end)



    }

    //ASINCRONO + http
    getPeliculasAsyncHttp(): Observable<Array<Pelicula>> {
        //Ojo, este return es del Observable
        return this.http.get(`${this.baseUrl}/peliculas`)
            .map((res: Response) => {  //Convertir con "map" el objeto Response a algo en formato Json
                this.peliculas = <Array<Pelicula>>res.json();  //casting para asegurarnos entre back y front coincide el esquema
                return this.peliculas; //este es el return del "map"
            }
            );
    }

    getPeliculasbyTitleAsyncHttp(title:string): Observable<Array<Pelicula>> {
        let relativeUrl = `${this.baseUrl}/peliculas/`+`${title}`;
        console.log(relativeUrl);
        //Ojo, este return es del Observable
        return this.http.get(relativeUrl)
            .map((res: Response) => {  //Convertir con "map" el objeto Response a algo en formato Json
                this.peliculas = <Array<Pelicula>>res.json();  //casting para asegurarnos entre back y front coincide el esquema
                return this.peliculas; //este es el return del "map"
            }
            );
    }

    addPelicula(p: Pelicula) {
        this.peliculas.push(p);
        this.peliculasChanged.next(this.peliculas.slice()); //este next() seria como un publish, slice para hacer un coon del array "this.recetas"
    }

}