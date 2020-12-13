let myLibrary = [];
let bookName;
let bookAuthor;
let bookPage;
let bookIsRead;
let savedJSON = [];
let i = 0;
const addnewBook = document.querySelector('#newBook');
const closeFormBtn = document.querySelector('#formCancel');
const submitBook = document.querySelector('#formSubmit');
const bookDisplay = document.querySelector('#bookDisplay');
const saveButton = document.querySelector('#saveButton');
const storedLibrary = localStorage.getItem('savedLibrary');

class Book {
    constructor(name, author, pages, isRead) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
    info = () => {
        return (this.name + " by " + this.author + ", " + this.pages + " pages, " + this.isRead);
    };
}

showSavedLibrary();
displayBook();

function showSavedLibrary() {
    if (storedLibrary) {
        myLibrary = JSON.parse(storedLibrary);
        i = myLibrary.length;
    } else {
        myLibrary = [];
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

    document.getElementById('bookname').value = '';
    document.getElementById('bookauthor').value = '';
    document.getElementById('bookpage').value = '';
    document.getElementById('notRead').checked = false;
    document.getElementById('read').checked = false;

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

function saveLibrary() {
    savedJSON = (JSON.stringify(myLibrary));
    localStorage.setItem('savedLibrary', savedJSON);
}

saveButton.addEventListener("click", saveLibrary);

addnewBook.addEventListener("click", openForm);

submitBook.addEventListener("click", addBooktoArray);

closeFormBtn.addEventListener("click", closeForm);
