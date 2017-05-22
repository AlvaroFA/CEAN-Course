//imports
const express = require('express'),
    couchbase = require('couchbase'),
    pug=require('pug'),
    bodyparser = require('body-parser'),
    ottoman = require('ottoman'),
    passport= require('passport'),
    session=require('express-session'),
    LocalStrategy= require('passport-local').Strategy;
var app = express();
var port = process.env.PORT || 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

passport.use(new LocalStrategy((username,password,done)=>{
    if(password !== '1234' ){
        return done(null,false);
    }
    return done(null,{username:username});
}));

passport.serializeUser((user,done)=>{
    done(null,user);
});

passport.deserializeUser((user,done)=>{
    done(null,user);
});

app.use(session({
    secret:'token',
    resave: false,
    saveUninitialized:true
}));

app.use(passport.initialize());
app.use(passport.session());

var requireAuthentication= (req,res,next)=>{
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect('/');
    }
};

// Configuracion a BBDD
//Conexion al cluster
var cluster = new couchbase.Cluster("couchbase://localhost");
//conexion al Bucket
var bucket = cluster.openBucket("compostela");
module.exports.bucket = bucket;
ottoman.store = new ottoman.CbStoreAdapter(bucket,couchbase);
var routes = require('./routes')(app);
ottoman.ensureIndices((error) => {
    if (error) {
        return console.log()
    }
    //Creacion del server
    app.listen(port, (error) => {
        if (error) {
            console.log(error);
        }
        console.log(`Servidor lanzado en ${port}`);
    });
});