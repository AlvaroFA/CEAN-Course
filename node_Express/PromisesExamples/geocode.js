//import
const request = require('request');
// @param1 address 
// @param2 exec callbck
var geocode = (addr, callbck) => {
    request(
        {
            url: `http://maps.googleapis.com/maps/api/geocode/json?address=${addr}`,
            json: true
        }, (error, response, body) => {
            if (error) {
                console.log(error);
                //primer parametro error el segundo el data  
                callbck(error, null);
            } else {
                //funcion callback 
                // @param1 error case
                //@param2 data case
                callbck(null, {
                    latitud: body.results[0].geometry.location.lat,
                    longitud: body.results[0].geometry.location.lng
                });
            }
        });
}

var fore = (addr , forecallbck)=>{
     request(
        {
            url: `https://darksky.net/forecast/0923bbd75062a65dbd955c56d6348406/${geocode.latitud},${geo.longitud}`,
            json: true
        }, (error, response, body) => {
            if (error) {
                console.log(error);
                //primer parametro error el segundo el data  
                forecallbck(error, null);
            } else {
                //funcion callback 
                // @param1 error case
                //@param2 data case
                forecallbck(null, {
                })
            }
        });
}

//exports
module.exports.geocode=geocode;