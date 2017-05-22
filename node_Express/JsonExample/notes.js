console.log('starting notes.js');
//exportando el metodo addNote
const fs = require('fs');

//agregar nota
var addNote = (title, description) => {
    //return `nueva nota con llamada ${title} y descripcion ${description}`;
    var notes = fetchNotes();
    var note = {
        title: title,
        description: description
    }
    //filtrado 
    /*notes.filter(function(note){
        return note.title === title;
    })
    */
    //filtrado con funciones arrow
    /* var data=fs.readFileSync('notesData.json');
       notes=JSON.parse(data);
       console.log(notes);
       */
    var duplicates = notes.filter((note) => note.title === title);
    if (duplicates.length === 0) {
        try {
            notes.push(note);
            // escritura del fichero
            fs.writeFileSync('notesData.json', JSON.stringify(notes));
        } catch (error) {
            console.log('error en el guardado');
        }
    }
}
var removeNote = (title) => {
    var n = fetchNotes();
    var filtrados = n.filter((notes) => {
        return note.title !== title;
    });
    saveNote(filtrados);
}
var getNote = (title) => {
    var n = fetchNotes();
    var filtrados = n.filter((notes) => {
        return n.title === title;
    });
    return filtrados[0];
}
var getAll = () => {
    return;
}
var fetchNotes = () => {
    return JSON.parse(fs.readFileSync('notesData.json'));
}

var saveNote = (n) => {
    fs.writeFileSync('notesData.json', JSON.stringify(n));
}

module.exports = {
    addNote: addNote,
    getNote: getNote,
    removeNote: removeNote,
    fetchNotes: fetchNotes,
    saveNote: saveNote,
    getAll: getAll
}


