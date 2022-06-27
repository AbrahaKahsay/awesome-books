const addBtn =  document.getElementById('add-btn');
const bookList = document.getElementById('booklist');

console.log(addBtn);
console.log(bookList)
let books = [
    // { 
    //     title: 'Easy Code',
    //     author: 'Abraha',
    //     id:1
    // },
    // {
    //     title: 'Hard Code',
    //     author: 'Diego',
    //     id:2
    // },
    // {
    //     title: 'Javacript for all',
    //     author: 'Francis',
    //     id:3
    // }
];

function addBook(title, author){
    

    const book = {
        title:title,
        author: author,
        id: books.length + 1
    }
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books))
    return book;
}

function removeBook(id){
    const newBooks = books.filter(book => book.id!==id);
    books = newBooks;
    return books;
}

// Add a book to the application interface
function addBkToInterface(book){
    //create div element to hold the title & author
    const newBook = document.createElement('div');
    newBook.setAttribute('id', book.id);
    //create title div
    const title = document.createElement('p');
    title.textContent = book.title;
    newBook.appendChild(title);
    //  create author div
    const author = document.createElement('p');
    author.textContent = book.author
    newBook.appendChild(author);
    //Add a remove button to the book div
    newBook.appendChild(createRemoveBtn());
    //  create a horizontal rule & append to div
    const hr = document.createElement('hr');
    newBook.appendChild(hr);
    bookList.append(newBook);
    return newBook;
}

function createRemoveBtn(){
    const removeBtn =  document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', removeBkInterface)
    return removeBtn;
}

// remove a book from the booklist application interface
function removeBkInterface(event){
    // get the  id of the book to be deleted
    const id =  +event.target.parentElement.id;
    //remove book from application interface
    event.target.parentElement.remove();
    //remove book from books array
    removeBook(id);
    return;
}

addBtn.addEventListener('click', () => {
    const author = document.getElementById('author').value;
    const title = document.getElementById('title').value;
    if(author && title){
        //add book to array
        const book = addBook(title, author);
        //add book to the interface
        addBkToInterface(book);
        // clear the form fields
        document.getElementById('author').value = '';
        document.getElementById('title').value = '';
    }

    // if any field is empty, do nothing
    return;
});

document.addEventListener('DOMContentLoaded', () => {
    if(!localStorage.getItem('books')) return;
    books = JSON.parse(localStorage.getItem('books'));
    books.forEach(book => addBkToInterface(book));
    return;
})