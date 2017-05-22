
//import

//se comenta para uso de express
//var http=require('http');
var express = require('express');
var bodyParser= require('body-parser');
// params server
const hostname = "127.0.0.1";
//const port = 1337;
/*create server express*/
var app = express();
/*pregunta al enviroment por port libre sino sele asigna 
el 3000*/
var port = process.env.PORT || 3000;
//para el parsing de params
app.use(bodyParser.json());
//app.listen(port);
app.listen(port,(error)=>{
    if(error){
        return console.log('error'+error);
    }
    console.log(`node.js:server lanzado en ${port}`);
});
//verbose USE
app.use('/contact',(req,res,next)=>{
    console.log('use1');
    next();
});
//dando uso al verbo  GET
// http:127.0.0.1:port/form/:param
app.get('/contact/:id',(req,res)=>{
    console.log('get1');
    //recogerPAram
    let contactID= req.params.id;
        res.send("{nombre:'sds', edad:19}");
});
//dando uso al verbo POST
/*app.post('/contact/',(req,res)=>{
    console.log('post1');
    res.send('Posteando POST');
});
*/
//dando uso al verbo POST con params
app.post('/contact',(req,res)=>{
    console.log('post1');
    let nombre= req.body.nombre;
    let edad= req.body.edad;
    res.send('Posteando POST');
    console.log(nombre,edad);
});
//sintaxis de creacion de server 1
//@request ---> peticiones
//@response ---> respuestas
/*
var server=http.createServer((request,response)=>{

});
server.listen(port,hostname,()=>{
    console.log(`server escuchando en ${port}`);
})
*/

/*sintaxis de creacion de servidor 2
    Esta sintaxis suele ser la mas usada
*/

/*http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'text-plain'});
    //devolucion en caso de success
    res.end('saludos');
}).listen(port,hostname,()=>{
    console.log(`server escuchando en ${port}`);
})
*/