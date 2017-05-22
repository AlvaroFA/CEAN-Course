//imports
const express= require('express'),
      couchbase= require('couchbase'),
      bodyparser= require('body-parser');
     
var app= express();
var port = process.env.PORT || 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
 
// Configuracion a BBDD
    //Conexion al cluster
var cluster= new couchbase.Cluster("couchbase://localhost");
    //conexion al Bucket
var bucket= cluster.openBucket("compostela");
module.exports.bucket= bucket;
var routes= require('./routes')(app);
//Creacion del server
app.listen(port, (error)=>{
    if(error){
        console.log(error);
    }
        console.log(`Servidor lanzado en ${port}`);
});