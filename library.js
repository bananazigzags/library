let myLibrary = [];

function Book(title, author, numPages, statusRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.statusRead = statusRead;
}

Book.prototype.info = function() {
    let readReport = '';
    if (this.statusRead) {
        readReport = 'read';
    } else readReport = 'not read yet';
    return `${this.title} by ${this.author}, ${this.numPages}, ${readReport}`;
}

function addBookToLibrary(title, author, numPages, statusRead) {
    myLibrary.push(new Book(title, author, numPages, statusRead));
}

const bookElem = document.querySelector("tbody");

function displayLibrary() {
    myLibrary.forEach((book) => {
        addBookToDisplay(book);
    });   
};

function addBookToDisplay(book) {
    const tr = document.createElement('tr');
    bookElem.appendChild(tr);
    const td = document.createElement('td');
    td.textContent = book.info();
    const icon = document.createElement('span');
    icon.classList.add('fas', 'fa-trash', 'fa-lg', 'align-bottom');
    icon.addEventListener('click', () => {
        alert("hi");
    });
    tr.appendChild(td);
    tr.appendChild(icon);
}

const form = document.getElementById("form");

const newBook = document.getElementById("new-book");
newBook.addEventListener('click', () => {
    form.classList.remove("hidden");
});

const formX = document.getElementById("close");
formX.addEventListener('click', () => {
    form.classList.add("hidden");
});

const buttonSubmit = document.getElementById("submit");
buttonSubmit.addEventListener('click', () => {
    form.classList.add("hidden");
});

function processForm() {
    const title = document.getElementById("title-form");
    const author = document.getElementById("author-form");
    const numPages = document.getElementById("num-pages-form");
    const readStatus = document.getElementById("read-status-form");
    let read;
    if (readStatus.checked) {
        read = true;
    } else read = false;
    addBookToLibrary(title.value, author.value, numPages.value, read);
    const book = new Book(title.value, author.value, numPages.value, read);
    addBookToDisplay(book);
    title.value = "";
    author.value = "";
    numPages.value = null;
    readStatus.value = "on";
}

addBookToLibrary("Walden", "Thoreau", 240, true);
addBookToLibrary("The Master and Margarita", "Bulgakov", 384, false);
displayLibrary();
