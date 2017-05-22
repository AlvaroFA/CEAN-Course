//Vamos a crear un nuevo modulo en nuestra aplicacion, recordar que hay que registrarlo en el modulo raiz

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PeliculaComponent } from '../app/pelicula/pelicula.component';
import { ListaPeliculasComponent } from './lista-peliculas/lista-peliculas.component';


@NgModule({
    imports: [
        RouterModule.forRoot([
            {   //cada uno de los PATH que queremos registrar en un JSON
                path: '', component: ListaPeliculasComponent
            },
            {
                path: 'alta', component: PeliculaComponent 
            },
            {
                path: '**', component: ListaPeliculasComponent  //el ** debe ser el ultimo path
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}