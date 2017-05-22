const ottoman   = require('ottoman');
const bucket    = require('../app').bucket; //recuperamos el bucket que tenemos en app.js
const couchbase = require('couchbase');

ottoman.store = new ottoman.CbStoreAdapter(bucket, couchbase);

//iniciamos el modelo y vemos como Ottoman simplifica el tema
var PeliculaModel = ottoman.model("Pelicula", {     //fabrica un modelo Person con el siguiente esquema
    nombre:"string",
    genero:"number",
    formatos:{
        digital:"boolean",
        bluray: "boolean",
        dvd: "boolean"
    },
    timestamp: {
        type: "Date", 
        default: function() {return new Date()}
    }    
},
// para hacer busqueda con nuestros metodos propios (sin usar los de Ottoman) tenemos que crear indice
{
    index:{
        findByName: {      //el nombre del metodo propio
            by: "nombre"   //el campo que vas a indexar
        }
    }
}
);

//exportamos esto para poder ser usado desde "route.js"
module.exports.PeliculaModel = PeliculaModel;