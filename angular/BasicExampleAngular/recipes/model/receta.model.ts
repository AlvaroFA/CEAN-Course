export enum Dificultad{Alta,Media,Baja};
import {Ingrediente} from './ingrediente.model';

export class Receta{
    nombre:string;
    numero:number;
    ingredientes:Ingrediente[];
    dificultad:Dificultad;
    preparacion:string;
    imagen:string
    
    constructor(n:string,m:number,d:Dificultad,p:string,i:string,ing:Ingrediente[])
    {
        this.nombre=n;
        this.numero=m;
        this.dificultad=d;
        this.preparacion=p,
        this.imagen=i;
        this.ingredientes=ing;
    }
}