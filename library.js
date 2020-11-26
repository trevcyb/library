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
const bookdivs = document.querySelectorAll('.book-item');

myLibrary[0] = new Book("The Witcher", "Andrzej Sapkowski", 500, false);
myLibrary[1] = new Book("Harry Potter", "J.K. Rowling", 600, true);
myLibrary[2] = new Book("The Art of War", "Sun Tzu", 100, true);
myLibrary[3] = new Book("How to Win Friends and Influence People", "Dale Carnegie", 200, true);
myLibrary[4] = new Book("The Alchemist", "Paulo Coelho", 200, true)
myLibrary[5] = new Book("The Witcher", "Andrzej Sapkowski", 500, false);
myLibrary[6] = new Book("Harry Potter", "J.K. Rowling", 600, true);
myLibrary[7] = new Book("The Art of War", "Sun Tzu", 100, true);
myLibrary[8] = new Book("How to Win Friends and Influence People", "Dale Carnegie", 200, true);
myLibrary[9] = new Book("The Alchemist", "Paulo Coelho", 200, true)
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
        bookIsRead = false;
    } else if (document.getElementById('read').checked) {
        bookIsRead = true;
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
        cell.setAttribute("tabindex","0");
        cell.setAttribute("dataid", c)
        cell.innerHTML = '<h2>' + myLibrary[c].name + '</h2>' + '<h3>' + myLibrary[c].author + '</h3>' ;
        bookDisplay.appendChild(cell).className = "book-item";

        let btnset = document.createElement('div');
        let bookitems = document.querySelectorAll(".book-item");
        bookitems.forEach(bookitem => bookitem.appendChild(btnset).className = "btnset");

        let remBtn = document.createElement('button');
        let readBtn = document.createElement('button');
        remBtn.id = "remBtn";
        remBtn.setAttribute = ("type", "button");
        remBtn.innerHTML = "&#10008";
        readBtn.id ="readBtn";
        readBtn.setAttribute = ("type", "button");
        readBtn.innerHTML = "&#10004";
        btnset = document.querySelectorAll(".btnset");
        btnset.forEach(btn => btn.appendChild(remBtn).className = "editbtn");
        btnset.forEach(btn => btn.appendChild(readBtn).className = "editbtn");
    }
}

function openForm() {
    document.getElementById("popupForm").style.display = "block";
}

function closeForm() {
    document.getElementById("popupForm").style.display = "none";
}

function showBtns() {
    document.getElementById("readBtn").style.display = "inline-block";
    document.getElementById("remBtn").style.display = "inline-block";
}

addnewBook.addEventListener("click", openForm);

submitBook.addEventListener("click", addBooktoArray);

closeFormBtn.addEventListener("click", closeForm);

bookdivs.forEach(bookdiv => bookdiv.addEventListener("click", showBtns));