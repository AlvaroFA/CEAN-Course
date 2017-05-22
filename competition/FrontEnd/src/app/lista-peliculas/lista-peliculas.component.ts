import { Component, OnInit, OnDestroy } from '@angular/core';
import{Pelicula} from '../models/pelicula';
import{Generos} from '../../common/generos';
import{Formatos} from '../models/formatos.model';
import {PeliculasService} from '../peliculas.service';
import { Subscription }                    from 'rxjs/Subscription';
import { Observable }                      from 'rxjs/Observable';

@Component({
  selector: 'app-lista-peliculas',
  templateUrl: './lista-peliculas.component.html',
  styleUrls: ['./lista-peliculas.component.css']
})
export class ListaPeliculasComponent implements OnInit,OnDestroy {

  //peliculas:Array<Pelicula>;
   subscription:Subscription;   //ponerla aqui fuera porque es una best practice cancelar la subscripcion en "ngOnDestroy"
   title:string;
    peliculas:Observable<Array<Pelicula>>;
  
  constructor(private peliculasService:PeliculasService){ 
    }



 
  ngOnInit() {
     //Cuando el servicio se entere de un cambio sobre el array de recetas, nosotros al estar subscritos
        //recibiremos un "data" que sera el array de recetas que se ha clonado en "recetas.service.ts"
       /* this.subscription = this.peliculasService.peliculasChanged.subscribe((data: Pelicula[]) => {
            this.peliculas = data;
        })

        //Llamada a la version sincrona
        //this.recetas = this.recetasService.getRecetas();  

        //Llamada a la version asincrona (forma1 de consumir un observable)
        //this.recetasService.getRecetasAsync().subscribe((data:Receta[])=>{
        this.peliculasService.getPeliculasAsyncHttp().subscribe((data:Pelicula[])=>{    
            this.peliculas= data;
        });   
*/
        this.peliculas = this.peliculasService.getPeliculasAsyncHttp();
        console.log(this.peliculas);    
  }
    
      addPelicula() {
        let p = new Pelicula("pelicula 1", 
                                    Generos.Accion,
                                     new Formatos(true,false,true)
                                   // [{nombre:"Bluray"}]
                                  )
                     /* new Pelicula("pelicula 2", 
                                    Generos.Comedia,
                                    [{disponible:true}]
                                   // [{nombre:"Dvd"}]
                                  )                                  
                     */
        this.peliculasService.addPelicula(p);
    }


    buscarPelicula(){
     this.peliculas= this.peliculasService.getPeliculasbyTitleAsyncHttp(this.title);
    }

        ngOnDestroy(){
        this.peliculasService = null;
        this.subscription.unsubscribe();  //Muy impòrtante, cerrar el ciclo de vida de la subscripcion
    }

    

}
