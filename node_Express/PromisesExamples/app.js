console.log('starting app ....');
//import 3rd
const yargs = require('yargs');
const geocode = require('./geocode');
const fore = require('./forecast.js');
//variables globales
var args = yargs.argv;
let geo = args.geo;
var encodeAddr = encodeURIComponent(geo);
var cmd = args._[0];
// cmd
if (cmd ==='geo') {
    console.log(`usando ${geo} como direccion`);
    //callbacks @param1 address 
    //@param2 function
    // function @param1 caso error @param2 lon y lat
    geocode.geocode(encodeAddr, function (error, data) {
        if (error) {
            console.log('error');
        } else {
            console.log(`latitud:${data.latitud}|longitud:${data.longitud}`);
            fore.fore(data.latitud, data.longitud, (error,data)=>{
                if(error){
                    console.log('error');
                }else{
                    console.log(`${data.temperatura}`);
                }
            })
        }
    });
} 

