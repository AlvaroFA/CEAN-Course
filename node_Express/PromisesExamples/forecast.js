//imports
const request = require('request');

var fore = (lat,lon,forecallbck)=>{
     request(
        {
            url: `https://darksky.net/forecast/0923bbd75062a65dbd955c56d6348406/${lat},${lon}`,
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
                forecallbck(null,{temperatura:body.currently.temperature});
            };
        });
}

module.exports.fore= fore;