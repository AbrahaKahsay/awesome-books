class Book {
  constructor(title, author, id){
      this.title = title;
      this.author = author;
      this.id = id;
  };
};

class UI  {

  books = [];

  addBook(book) {
    this.books.push(book);
    localStorage.setItem('books', JSON.stringify(this.books));
    console.log(this.books);
    return book;
  };

  removeBook(event) {
    //remove element from interaface
    const id = +event.target.parentElement.id;
    event.target.parentElement.remove();
    // remove element from array
    const newBooks = books.filter((book) => book.id !== id);
    this.books = newBooks;
    localStorage.setItem('books', JSON.stringify(this.books));
    return this.books;
  };

  createRemoveBtn() {
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', this.removeBook);
    return removeBtn;
  };

  // Add a book to the application interface
  addBkToInterface(book) {
    // create div element to hold the title & author
    const newBook = document.createElement('div');
    newBook.setAttribute('id', book.id);
    // create title div
    const title = document.createElement('p');
    title.textContent = book.title;
    newBook.appendChild(title);
    //  create author div
    const author = document.createElement('p');
    author.textContent = book.author;
    newBook.appendChild(author);
    // Add a remove button to the book div
    newBook.appendChild(this.createRemoveBtn());
    //  create a horizontal rule & append to div
    const hr = document.createElement('hr');
    newBook.appendChild(hr);
    bookList.append(newBook);
    return newBook;
  };
    
};

const addBtn = document.getElementById('add-btn');
const bookList = document.getElementById('booklist');
const ui = new UI();

addBtn.addEventListener('click', () => {
  const author = document.getElementById('author').value;
  const title = document.getElementById('title').value;

  if (author && title) {
    // add book to array
    const book = new Book(title, author, ui.books.length + 1);
    ui.addBook(book);
    // add book to the interface
    ui.addBkToInterface(book);
    // clear the form fields
    document.getElementById('author').value = '';
    document.getElementById('title').value = '';
  }
  // if any field is empty, do nothing
});

document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('books')) return;
  books = JSON.parse(localStorage.getItem('books'));
  books.forEach((book) => ui.addBkToInterface(book));
});