import { Pipe, PipeTransform } from '@angular/core';
import { Generos } from '../../../common/generos';

@Pipe({
  name: 'generosPipe'
})
export class GenerosPipe implements PipeTransform {

  transform(value: number): string {
    let dato: string;
    switch (value) {
      case Generos.Accion:
        dato = 'Accion';
        break;
      case Generos.Comedia:
        dato = 'Comedia';
        break;
      case Generos.Drama:
        dato = 'Drama';
        break;
      case Generos.Romance:
        dato = 'Romance';
        break;
      case Generos.SciFi:
        dato = 'Scifi';
        break;
      case Generos.Terror:
        dato = 'Terror';
        break;
      default:
        dato= 'Accion';
        break;
    }
    return dato;
  }

}
