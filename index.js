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

// Single Page Application
const booksSection = document.getElementById('books');
const addBookSection = document.getElementById('form');
const contactSection = document.getElementById('contact');

const listLink = document.getElementById('list-link');
const addNewLink = document.getElementById('add-new-link');
const contactLink = document.getElementById('contact-link');

function loadContent() {
  if (window.location.hash === '#books') {
    booksSection.style.display = 'block';
    addBookSection.style.display = 'none';
    contactSection.style.display = 'none';

    listLink.style.fontWeight = 'bold';
    addNewLink.style.fontWeight = 'normal';
    contactLink.style.fontWeight = 'normal';
  } else if (window.location.hash === '#form') {
    addBookSection.style.display = 'block';
    booksSection.style.display = 'none';
    contactSection.style.display = 'none';

    listLink.style.fontWeight = 'normal';
    addNewLink.style.fontWeight = 'bold';
    contactLink.style.fontWeight = 'normal';
  } else if (window.location.hash === '#contact') {
    contactSection.style.display = 'block';
    booksSection.style.display = 'none';
    addBookSection.style.display = 'none';

    listLink.style.fontWeight = 'normal';
    addNewLink.style.fontWeight = 'normal';
    contactLink.style.fontWeight = 'bold';
  }
}

window.addEventListener('hashchange', loadContent);