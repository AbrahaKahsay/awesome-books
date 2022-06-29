/* eslint-disable max-classes-per-file */
const bookList = document.getElementById('booklist');
const dateDiv = document.getElementById('date');

const bookContainer = document.getElementById('book-con');
const addBookContainer = document.getElementById('add-book');
const contactInformation = document.getElementById('cont-info');

const list = document.getElementById('list');
const addNew = document.getElementById('add-new');
const contact = document.getElementById('contact');

addNew.addEventListener('click', (e) => {
  e.target.classList.add('active');
  addBookContainer.classList.remove('hide');
  list.classList.remove('active');
  bookContainer.classList.add('hide');
  contact.classList.remove('active');
  contactInformation.classList.add('hide');
});

list.addEventListener('click', (e) => {
  e.target.classList.add('active');
  bookContainer.classList.remove('hide');
  addNew.classList.remove('active');
  addBookContainer.classList.add('hide');
  contact.classList.remove('active');
  contactInformation.classList.add('hide');
});

contact.addEventListener('click', (e) => {
  e.target.classList.add('active');
  contactInformation.classList.remove('hide');
  list.classList.remove('active');
  bookContainer.classList.add('hide');
  addNew.classList.remove('active');
  addBookContainer.classList.add('hide');
});

class MyTime {
  nth = (d) => {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }

  formatedTime = () => {
    const date = new Date();
    const [hr, pm] = date.toLocaleString('en-US', { hour: 'numeric', hour12: true }).toString().split(' ');
    const timeString = `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}${this.nth(date.getDate())} ${date.getFullYear()} ${hr}:${date.getMinutes()}:${date.getSeconds()} ${pm.toLowerCase()}`;
    return timeString;
  }
}

const appTime = new MyTime();
setInterval(() => { dateDiv.textContent = appTime.formatedTime(); }, 1000);

class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

class UI {
  books = [];

  addBook(book) {
    this.books.push(book);
    localStorage.setItem('books', JSON.stringify(this.books));
    return book;
  }

  removeBook(event) {
    // remove element from interaface
    const id = +event.target.parentElement.id;
    event.target.parentElement.remove();
    // remove element from array
    const newBooks = this.books.filter((book) => book.id !== id);
    this.books = newBooks;
    localStorage.setItem('books', JSON.stringify(this.books));
    return this.books;
  }

  createRemoveBtn() {
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', this.removeBook);
    return removeBtn;
  }

  // Add a book to the application interface
  addBkToInterface(book) {
    // create div element to hold the title & author
    const newBook = document.createElement('div');
    newBook.setAttribute('id', book.id);
    // create title div
    const title = document.createElement('p');
    title.textContent = `"${book.title}"`;
    newBook.appendChild(title);

    const by = document.createElement('p');
    by.textContent = 'by';
    newBook.appendChild(by);

    //  create author div
    const author = document.createElement('p');
    author.textContent = book.author;
    newBook.appendChild(author);
    // Add a remove button to the book div
    newBook.appendChild(this.createRemoveBtn());
    //  create a horizontal rule & append to div
    bookList.append(newBook);
    return newBook;
  }
}

const addBtn = document.getElementById('add-btn');
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
  const books = JSON.parse(localStorage.getItem('books'));
  books.forEach((book) => ui.addBkToInterface(book));
});