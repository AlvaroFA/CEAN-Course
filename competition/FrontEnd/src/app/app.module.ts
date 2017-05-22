import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ListaPeliculasComponent } from './lista-peliculas/lista-peliculas.component';
import { PeliculaComponent } from './pelicula/pelicula.component';
import{PeliculasService} from './peliculas.service';
import { GenerosPipe } from './models/pipes/generos.pipe';
import{AppRoutingModule} from './routing.app';

@NgModule({
  declarations: [
    AppComponent,
    ListaPeliculasComponent,
    PeliculaComponent,
    GenerosPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [PeliculasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
