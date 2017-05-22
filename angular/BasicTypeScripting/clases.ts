import { Librarian } from './intefaces';

class UniversityLibrarian implements Librarian {
    name: string;
    email: string;
    department: string;
}

abstract class ReferenceItem {
    //constructor vacio para clase abstracta
    constructor() {

    }
    printItem(): void {
        console.log('Item impreso');
    }

    // llamada de un metodo abstracto
    abstract metodosAbs(): string;
}

class Magazine extends ReferenceItem {
    constructor() {
        super();
    }
    metodosAbs(): string {
        super.printItem();
        return " mensaje procedente de metodo abstracto ";
    }

}


export { UniversityLibrarian };

