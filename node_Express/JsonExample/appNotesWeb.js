//imports
const notes = require('./notes.js');
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
app.listen(port, (error) => {
    if (error) {
        return console.log('error' + error);
    }
    console.log(`node.js:server lanzado en ${port}`);
});
//middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/notes', (req, res, next) => {
    console.log('notes');
    next();
});

app.get('/getnote/:title', (req, res) => {
    console.log('get1');
    //recogerPAram
    let title = req.params.title;
    let note= notes.getNote(title);
    console.log(note)
    res.send(note);
});

app.get('/notes/all', (req, res) => {
    console.log('get1');
    //recogerPAram
    let notas = notes.getAll();
    notas.forEach((nota) => {
        console.log(nota.title);
    }
    )
    res.status(200).send(notas);
});

app.post('/addnote', (req, res) => {
    console.log('get1');
    //recogerPAram
    let title = req.body.title;
    let description = req.body.description;
    let nota =notes.addNote(title,description);
    console.log(nota);
    res.send(200).send(nota);
});

app.delete('/notes/:title', (req, res) => {
    console.log('get1');
    //recogerPAram
    let title = req.params.title;
    res.send(notes.removeNote(title, desc));
});

