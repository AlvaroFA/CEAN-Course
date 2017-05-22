export class Formatos{
    private _bluray:boolean;
    private _dvd:boolean;
    private _digital:boolean;


    constructor(b:boolean,d:boolean,dv:boolean){
        this._bluray=b;
        this._digital=d;
        this._dvd=dv;
    }
    
    get bluray(){
        return this._bluray;
    }
    get dvd(){
        return this._dvd;
    }
    get digital(){
        return this._digital;
    }

}