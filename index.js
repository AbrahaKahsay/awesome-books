const insertBookSection = document.querySelector('.insert-book');

function CreateBooks(title, author){
    this.title = title;
    this.author = author;
}

const firstBook = new CreateBooks("The Alchemist", "Paulo Cohleo");
