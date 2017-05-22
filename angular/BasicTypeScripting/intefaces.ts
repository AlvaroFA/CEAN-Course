//imports
import { Category } from './enums';
interface Book {
    id: number;
    title: string;
    author: string;
    avaliable: boolean;
    category: Category;
    pages?: number;
}


interface Author extends Personal {
    numBooksPub: number;
}

interface Librarian extends Personal{
    department: string;
}

//interfaz privada
interface Personal {
    name: string;
    email: string;
}


export {Author,Librarian,Book};