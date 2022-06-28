export default class book {
  constructor(title, author, id){
      this.title = title;
      this.author = author;
      this.id = id;
  }
}





const addBtn = document.getElementById('add-btn');
const bookList = document.getElementById('booklist');
let books = [];

function addBook(title, author) {
  const book = {
    title,
    author,
    id: books.length + 1,
  };
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
  return book;
}

function removeBook(id) {
  const newBooks = books.filter((book) => book.id !== id);
  books = newBooks;
  localStorage.setItem('books', JSON.stringify(books));
  return books;
}

// remove a book from the booklist application interface
function removeBkInterface(event) {
  // get the  id of the book to be deleted
  const id = +event.target.parentElement.id;
  // remove book from application interface
  event.target.parentElement.remove();
  // remove book from books array
  removeBook(id);
}

function createRemoveBtn() {
  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.addEventListener('click', removeBkInterface);
  return removeBtn;
}

// Add a book to the application interface
function addBkToInterface(book) {
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
  newBook.appendChild(createRemoveBtn());
  //  create a horizontal rule & append to div
  const hr = document.createElement('hr');
  newBook.appendChild(hr);
  bookList.append(newBook);
  return newBook;
}

addBtn.addEventListener('click', () => {
  const author = document.getElementById('author').value;
  const title = document.getElementById('title').value;
  if (author && title) {
    // add book to array
    const book = addBook(title, author);
    // add book to the interface
    addBkToInterface(book);
    // clear the form fields
    document.getElementById('author').value = '';
    document.getElementById('title').value = '';
  }
  // if any field is empty, do nothing
});

document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('books')) return;
  books = JSON.parse(localStorage.getItem('books'));
  books.forEach((book) => addBkToInterface(book));
});