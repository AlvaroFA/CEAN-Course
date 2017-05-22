const express = require('express');
const bodyparser = require('body-parser');
const hostname = "127.0.0.1";
const port = 3001;
const recetas = require('./recipes');

var app = express();
var recipes= [];
app.listen(port, (error) => {
    if (error) {
        return console.log('error' + error);
    }
    console.log(`node.js:server lanzado en ${port}`);
});

app.use('/recetas', (req, res, next) => {
    console.log('recetas');
    next();
});


app.get('/recetas', (req, res) => {
    console.log('receta solicitada');
    recipes = recetas.getAll();
    recipes.forEach((recipe) => {
        console.log(recipe.nombre);
    })
    res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
    res.status(200).send(recipes);
});

