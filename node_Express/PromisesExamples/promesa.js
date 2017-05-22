// promesas

/*var promesa= new Promise((resolve,reject)=>{
    //En caso de ok
    //resolve('ok');
    //en caso de fallo
    reject('no ha ido bien');
});


promesa.then((msg)=>{
    console.log(msg);
},(error)=>{
    console.log(error);
})

*/
/*
//callbacks
callback('resultado vacio',null);
// como promises
reject('resultado vacio');
resolve({
    latitud:9.90,
    longitud: 6.43
})

*/

// suma asincrona

//realizando la promises
var suma= (a,b) =>{
    return new Promise((resolve,reject)=>{
        if (typeof a === 'number' && typeof b=== 'number'){
            resolve(a+b);
        }else{
            reject('Format Error');
        }
    });
}

//usando la promise
suma(1,1).then((rst)=>{
    console.log(rst);
    return suma(rst,10);
},(error)=>{
    console.log('error');
}
//usamos a partir de aqui el valor del return
).then((rst)=>{
    console.log(rst);
},(error)=>{
    console.log('error2');
}).catch((error)=>{
    console.log(error);
});