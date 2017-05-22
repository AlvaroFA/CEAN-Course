//imports
console.log('starting app');
// import propio
const notes = require('./notes.js');
//import 3rd
const yars = require('yargs');
// test console 
var args = yars.argv;
console.log(`Comando: ${args}`);
var cmd = args._[0];
console.log(`Comando: ${cmd}`);
// ambito desde descripcion de variables
let title = args.title;
let desc = args.desc;
// checkers 
function checkTitle() {
    return (title && title !== " ");
}
function checkDescription() {
    return (desc && desc !== "");
}
//menu
if (cmd === "add") {
    if (checkDescription && checkTitle) {
        console.log(notes.addNote(title, desc));
    } else {
        console.log('error');
    }
} else if (cmd === "getNote") {
    notes.getNote();
} else if (cmd === "removeNote") {
    notes.removeNote();
} else if (cmd === "recover") {
    console.log(notes.recover());
} else if (cmd === "fetchNotes") {
    console.log(notes.fetchNotes());
} else if (cmd === "saveNote") {
    notes.saveNote();
}else if (cmd === "list") {
    var notas = notes.getAll();
    notas.forEach((notas)=> {
        console.log(notas.title + "\n");   
    });
}


