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

addBtn.addEventListener('click', () => {
    console.log('btn clicked')
})