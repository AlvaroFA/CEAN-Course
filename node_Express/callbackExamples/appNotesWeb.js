//imports
const notes = require('.\notes.js');
var express = require('express');
var bodyParser = require('body-parser');
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
app.listen(port, (error) => {
    if (error) {
        return console.log('error' + error);
    }
    console.log(`node.js:server lanzado en ${port}`);
});

app.use('/notes', (req, res, next) => {
    console.log('notes');
    next();
});

app.get('/contact/:title', (req, res) => {
    console.log('get1');
    //recogerPAram
    res.send(notes.getNote(title));
});

app.get('/contact/all', (req, res) => {
    console.log('get1');
    let notas = notes.getAll();
    //recogerPAram
    notas.forEach((nota) => {
       console.log(nota.title)
    }
    );
}
);
      app.post('/contact/new/:title/:desc', (req, res) => {
        console.log('get1');
        //recogerPAram
        res.send(notes.addNote(title, desc));
    });

app.delete('/contact/new/:title', (req, res) => {
    console.log('get1');
    //recogerPAram
    let title = req.params.title;
    res.send(notes.removeNote(title, desc));
});

