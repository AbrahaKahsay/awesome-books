const addBtn =  document.getElementById('add-btn');
const bookList = document.getElementById('booklist');

console.log(addBtn);
console.log(bookList)
let books = [
    { 
        title: 'Easy Code',
        author: 'Abraha',
        id:1
    },
    {
        title: 'Hard Code',
        author: 'Diego',
        id:2
    },
    {
        title: 'Javacript for all',
        author: 'Francis',
        id:3
    }
];

function addBook(title, author){
    const book = {
        title:title,
        author: author,
        id: books.length + 1
    }
    books.push(book);
    return book;
}

function removeBook(id){
    const newBooks = books.filter(book => book.id!==id);
    books = newBooks;
    return books;
}


// Add a book to the application interface
function addBkToInterface(book){
    const newBook = document.createElement('div');
    newBook.setAttribute('id', book.id);
    const title = document.createElement('p');
    title.textContent = book.title;
    newBook.appendChild(title);
    const author = document.createElement('p');
    author.textContent = book.author
    newBook.appendChild(author);
    bookList.append(newBook);
    return newBook;
}

addBtn.addEventListener('click', () => {
    const author = document.getElementById('author').value;
    const title = document.getElementById('title').value;
    if(author && title){
        //add book to array
        const book = addBook(title, author);
        //add book to the interface
        addBkToInterface(book);
        
    }

    // if any field is empty, do nothing
    return;
    
})