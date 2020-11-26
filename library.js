let myLibrary = [];
let bookName;
let bookAuthor;
let bookPage;
let bookIsRead;
let i = 10;
const addnewBook = document.querySelector('#newBook');
const closeFormBtn = document.querySelector('#formCancel');
const submitBook = document.querySelector('#formSubmit');
const bookDisplay = document.querySelector('#bookDisplay');
myLibrary[0] = new Book("The Witcher", "Sapkowski", 500, "has not been read");
myLibrary[1] = new Book("Harry Potter", "J.K. Rowling", 600, "has been read.");
myLibrary[2] = new Book("The Art of War", "Sun Tzu", 100, "has been read.");
myLibrary[3] = new Book("How to Win Friends and Influence People", "Dale Carnegie", 200, "has been read");
myLibrary[4] = new Book("The Alchemist", "Paulo Coelho", 200, "has been read.")
myLibrary[5] = new Book("The Witcher", "Sapkowski", 500, "has not been read");
myLibrary[6] = new Book("Harry Potter", "J.K. Rowling", 600, "has been read.");
myLibrary[7] = new Book("The Art of War", "Sun Tzu", 100, "has been read.");
myLibrary[8] = new Book("How to Win Friends and Influence People", "Dale Carnegie", 200, "has been read");
myLibrary[9] = new Book("The Alchemist", "Paulo Coelho", 200, "has been read.")
displayBook();

function Book(name, author, pages, isRead) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = function() {
        return(name + " by " + author + ", " + pages + " pages, " + isRead);
    }
}

function addBooktoArray() {
    bookName = document.getElementById('bookname').value;
    bookAuthor = document.getElementById('bookauthor').value;
    bookPage = document.getElementById('bookpage').value;
    if (document.getElementById('notRead').checked) {
        bookIsRead = "has not been read.";
    } else if (document.getElementById('read').checked) {
        bookIsRead = "has been read.";
    }
    myLibrary[i] = new Book(bookName, bookAuthor, bookPage, bookIsRead);
    console.log(myLibrary[i].info());
    i++;

    let bookGrid = document.querySelectorAll(".book-item");
    bookGrid.forEach(book => book.remove());

    displayBook();
}

function displayBook() {
    for (c = 0; c < myLibrary.length; c++) {
        let cell = document.createElement('div');
        cell.innerHTML = '<h2>' + myLibrary[c].name + '</h2>' + '<h3>' + myLibrary[c].author + '</h3>';
        bookDisplay.appendChild(cell).className = "book-item";
    }
}

function openForm() {
    document.getElementById("popupForm").style.display = "block";
}

function closeForm() {
    document.getElementById("popupForm").style.display = "none";
}

addnewBook.addEventListener("click", openForm);

submitBook.addEventListener("click", addBooktoArray);

closeFormBtn.addEventListener("click", closeForm);