import {Category} from './enums';
import {Book,Author,Librarian} from './intefaces';


function getAllBooks(): any[] {
    var books = [{
        id:1,
        tittle: "libro1",
        author: "author1",
        avaliable: true,
        category:Category.Ficcion
    },
    {
        id:2,
        tittle: "libro2",
        author: "author2",
        avaliable: false,
        category:Category.Poesia
    }
    ]
    return books;
}

//valores por defecto
function logFirstAvaliable(books: any[]=getAllBooks()): any {
    let first: any = {};
    // version clasica
    for (let i = 0; i <= books.length; i++) {
        if (books[i].avaliable) {
            first = books[i];
            break;
        }
    }
    //version typescript
    for (let currentBooks of books) {
        if (currentBooks.avaliable) {
            first = currentBooks;
            break;
        }
    }
    return first;
}

function getBooksTittleByCategory(category: Category): Array<string> {
    const allbooks:any[] = getAllBooks();
    let tittles: string[] = [];
    for (let currentBook of allbooks) {
        if (currentBook.category === Category) {
            tittles.push(currentBook.tittle);
        }
        return allbooks;
    }
}

function getBooksTittleById(id:number):any{
    const allbooks:any[] = getAllBooks();
    let book:any="";
    /*for (let currentBook of allbooks) {
        if (currentBook.id === id) {
            book=currentBook;
            break;
        }*/
        return allbooks.filter(book =>book.id === id)[0];
   // }
}

/*function checkOutBooks(usuario:string, ...idBooks:number[]):Array <string>{
    let booksCheck:any[]  = [];
    for(let actualId of idBooks){
        let book = getBooksTittleById(actualId);
        if(book && book.avaliable){
            booksCheck.push(book.tittle);
        }
    }
    return booksCheck;
}*/

function checkOutBooks(autor:string);
function checkOutBooks(avaliable:boolean);
function checkOutBooks(tittle:string);

function checkOutBooks(param:any){
    if(typeof param === 'string'){

    }else if(typeof param === 'boolean'){}

}

//proceso 
let books = getAllBooks();
let fbs = logFirstAvaliable(books);
let titulo = getBooksTittleByCategory(Category.Ficcion);

console.log(getBooksTittleById(3));
//console.log(getAllBooks());
/*let titleToCheack= checkOutBooks('usuario',1,2);
titleToCheack.forEach((item)=>{
    console.log(item);
})
*/

