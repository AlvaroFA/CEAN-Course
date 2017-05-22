const PeliculaModel = require('./models/pelicula-model').PeliculaModel; //ojo definir la variable inicandola con Mayusculas (es necesario por usar Ottoman)
const N1qlQuery = require('couchbase').N1qlQuery;
const bucket = require('./app').bucket;  //Para importar el bucket del que hicimos "module.export" en app.js

//tenemos que hacer que este preparada para recibir una instancia de "app", ya que el enrutado lo necesita.
var appRouter = function (app) {

    //creacion de pelicula
    app.post('/peliculas', (req, res) => {
               
        var pelicula = new PeliculaModel({   //Instanciamos el model con el esquema creado con Ottoman en memoria
            nombre: req.body.nombre,
            genero: req.body.genero,
            formatos: req.body.formatos
        });

        pelicula.save((error, result) => {
            if (error) {
                return res.status(400).send(error);
            }
            res.send(result);
        });
    });


    //listado de peliculas
    app.get('/peliculas', (req, res) => {
        //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200'); //deja pasar a aquel servidor que tenga la ruta (el del servidor Angular)
        //Usamos el metodo "find" que proporciona Ottoman
        // * como primer parametro objeto JSON vacio (no filtra en el WHERE)
        // * como segundo parametro Ottoman te carga los comentarios asociados a esa persona (sino saldra un null)
        PeliculaModel.find({}, (error, peliculas) => {
            if (error) {
                return res.status(400).send(error);
            }
            res.send(peliculas);
        });
    });

    //obtencion de pelicula por nombre de pelicula
    app.get('/peliculas/:nombre', (req, res) => {
       // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200'); //deja pasar a aquel servidor que tenga la ruta (el del servidor Angular)
        let paramName = "%" + req.params.nombre + "%";

        var statement = "SELECT pelicula.nombre, pelicula.genero, pelicula.formatos " +
            " FROM `" + bucket._name +
            "` AS pelicula WHERE pelicula.nombre LIKE '" + paramName + "'";


        //2. Transformar sentencia de 1. a una query viable couchbase server
        var query = N1qlQuery.fromString(statement);

        //3. Lanzar la query del paso 2 a traves del objeto bucket (2º parametro ha de ser funcion callback donde recoge resultados)
        //4. Recoger y devolver resultados de forma asincrona con un callback, por tanto pasar callback como parametros
        bucket.query(query, (error, result) => {
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
            if (error) {
                console.log("Rama error en select con n1qlñ");
                return res.status(400).send(error);
            }

            res.send(result);
        });


        /* Metodo antiguo para busqueda directa
                let peliculaNombre = req.params.nombre;
                console.log(peliculaNombre);
        
               PeliculaModel.findByName(peliculaNombre, (error, peliculas) => {
                     if(error){
                        return res.status(400).send(error);
                    }
                    res.send(peliculas); 
            }); */
    });

    //obtencion de pelicula por id de documento
    app.get('/peliculas/find/:id', (req, res) => {

        let peliculaId = req.params.id;

        //La mejor forma de hacerlo es usando funcion "getById" proporcionada por Ottoman que devuelve un objetoJSON
        PeliculaModel.getById(peliculaId, (error, pelicula) => {
            if (error) {
                return res.status(400).send(error);
            }
            res.send(pelicula);
        });
    });

};


module.exports = {
    appRouter: appRouter
}  