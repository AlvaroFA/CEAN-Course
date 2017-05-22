import{Generos} from '../../common/generos';
//import{FormatosDisponibles} from './formato.model';
import{Formatos} from './formatos.model';

export class Pelicula {

    private _nombre:string;
    private _generos:Generos; 
    //private _formatos:Formatos[];
    private _formatos:Formatos;

    constructor(n:string, g:Generos, f:Formatos){
        this._nombre=n;
        this._generos=g;
        //this._formatos=f;
        this._formatos=f;
    }

    get nombre():string{
      return this._nombre;
    }

    get generos():Generos{
      return this._generos;
    }

    /*get formatos():Formatos[]{
      return this._formatos;
    }
    */

        get formatos():Formatos{
      return this._formatos;
    }
}

//OJO, en los modelos no se usan decoradores ni hay que registrarlos en ningun sitio, simplemente se usan
/*
export class Receta {

    private _nombre:string;
    private _ingredientes:Ingrediente[];
    _dificultad: Dificultad;
    private _preparacion:string;
    private _imagen:string;

    constructor(n:string, d: Dificultad, p:string, i:string, ingredientes:Ingrediente[]){
      this._nombre = n;  
      this._dificultad = d;
      this._preparacion = p;
      this._imagen = i;
      this._ingredientes = ingredientes;
    }

    get nombre():string{
      return this._nombre;
    }

    get ingredientes():Ingrediente[]{
      return this._ingredientes;
    }

    get preparacion():string{
      return this._preparacion;
    }


} */
