const express    = require('express'),
      bodyParser = require('body-parser'),
      ottoman    = require('ottoman'),
      couchbase  = require('couchbase'); 

var app = express();                 //creando el servidor que nos haga de  
var port = 3000;

var pelis = ["peli1", "peli2"];

//bodyParser: Usarlo antes de hacer el enrutado
app.use(bodyParser.json());         //Colocamos este bloque de terceros, no necesita next() porque ya lo ponen ellos 
app.use(bodyParser.urlencoded({extended:false}));     //Para formularios web en la vista

app.get('/', (req, res) => {
    console.log(req); //Asi podemos ver todo lo que trae el objeto
    res.send("Hola, esta en la raiz de la aplicacion web de peliculas");
});


//Vamos a usar el smart-client de couchbase -----------
//1º instanciamos un cluster y le damos la direccion donde esta el cluster
var cluster = new couchbase.Cluster("couchbase://localhost");  //si no resuelve bien poner la ip 127.0.0.1
var bucket  = cluster.openBucket("peliculas","123456", (error) => {

    if (error){
        console.log("No se puede abrir el bucket **peliculas**");
    }
});

module.exports.bucket = bucket; //Para poder usarlo en "models.js" sin abrir una nueva (esta enganchando al app.js un objeto bucket)

//Para la Forma2 (exportar el objeto Javascript con la funcion)
var routes = require('./routes');          //asi tenemos el objeto
routes.appRouter(app);                     //con el objeto ya podemos usar la funcion "appRouter"

//ottoman
ottoman.store = new ottoman.CbStoreAdapter(bucket, couchbase);

ottoman.ensureIndices((error) => { //op. asincrona que forma los indices
    if (error){
        return console.log("Error indexando con Ottoman");
    }

    app.listen(port, (error) => {          //ponemos a la escucha la instancia y hacemos callback para saber si corre bien 
        if (error) {
            console.log("Error al iniciar server express");
        }
        console.log(`Server express corriendo sobre puerto ${port}`);
    });
});   

