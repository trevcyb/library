let myLibrary = [];
let bookName;
let bookAuthor;
let bookPage;
let bookIsRead;
let i = 9;
const addnewBook = document.querySelector('#newBook');
const closeFormBtn = document.querySelector('#formCancel');
const submitBook = document.querySelector('#formSubmit');
const bookDisplay = document.querySelector('#bookDisplay');

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
    this.info = function () {
        return (name + " by " + author + ", " + pages + " pages, " + isRead);
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
        cell.setAttribute("tabindex", "0");
        cell.setAttribute("data-bookid", c)
        cell.innerHTML = '<h2>' + myLibrary[c].name + '</h2>' + '<h3>' + myLibrary[c].author + '</h3>';
        bookDisplay.appendChild(cell).className = "book-item";

        let btnset = document.createElement('div');
        let bookitems = document.querySelectorAll(".book-item");
        bookitems.forEach(bookitem => bookitem.appendChild(btnset).className = "btnset");

        let remBtn = document.createElement('button');
        let readBtn = document.createElement('button');
        remBtn.id = "remBtn";
        remBtn.setAttribute = ("type", "button");
        remBtn.innerHTML = "&#10008 Remove Book";
        readBtn.id = "readBtn";
        readBtn.setAttribute = ("type", "button");

        if (myLibrary[c].isRead === true) {
            readBtn.innerHTML = "&#128513 Book Read";
        } else if (myLibrary[c].isRead === false) {
            readBtn.innerHTML = "&#128517 Haven't Started";
        }
        
        btnset = document.querySelectorAll(".btnset");
        btnset.forEach(btn => btn.appendChild(remBtn).className = "editbtn" + c);
        btnset.forEach(btn => btn.appendChild(readBtn).className = "editbtn" + c);

    }

    let bookitems = document.querySelectorAll(".book-item");

    bookitems.forEach(bookdiv => bookdiv.addEventListener("mouseover", function () {
        let chosen = document.querySelectorAll(".editbtn" + this.dataset.bookid);
        for (let chs of chosen) {
            chs.style.display = "inline-block";
        }
    }));

    bookitems.forEach(bookdiv => bookdiv.addEventListener("mouseout", function () {
        let chosen = document.querySelectorAll(".editbtn" + this.dataset.bookid);
        for (let chs of chosen) {
            chs.style.display = "none";
        }
    }));

    const readStatus = document.querySelectorAll('#readBtn');
    readStatus.forEach(bk => bk.addEventListener("click", changeReadStatus));

    const delBook = document.querySelectorAll('#remBtn');
    delBook.forEach(bk => bk.addEventListener("click", removeBook));

}

function changeReadStatus(event) {
    if (myLibrary[event.target.parentElement.parentElement.dataset.bookid].isRead === true) {
        myLibrary[event.target.parentElement.parentElement.dataset.bookid].isRead = false
    } else if (myLibrary[event.target.parentElement.parentElement.dataset.bookid].isRead === false) {
        myLibrary[event.target.parentElement.parentElement.dataset.bookid].isRead = true
    }
    console.log(myLibrary[event.target.parentElement.parentElement.dataset.bookid].isRead)
    let bookGrid = document.querySelectorAll(".book-item");
    bookGrid.forEach(book => book.remove());

    displayBook();
}

function removeBook(event) {
    myLibrary.splice(event.target.parentElement.parentElement.dataset.bookid, 1);
    alert("Item was removed");

    let bookGrid = document.querySelectorAll(".book-item");
    bookGrid.forEach(book => book.remove());

    displayBook();
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