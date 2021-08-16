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
    return `${this.title} by ${this.author}, ${this.numPages} pages`;
}

function addBookToLibrary(title, author, numPages, statusRead) {
    myLibrary.push(new Book(title, author, numPages, statusRead));
    displayLibrary();
}

function toggleRead(id) {
    if (myLibrary[id].statusRead == true) {
        myLibrary[id].statusRead = false;
    } else {
        myLibrary[id].statusRead = true;
    }
}

const bookElem = document.querySelector("tbody");

let bookNum;

function displayLibrary() {
    bookNum = 0;
    bookElem.textContent = '';
    myLibrary.forEach((book) => {

        const tr = document.createElement('tr');
        bookElem.appendChild(tr);

        const td = document.createElement('td');
        td.textContent = book.info();
        tr.id = bookNum;

        const icon = document.createElement('span');
        icon.classList.add('fas', 'fa-trash', 'fa-lg', 'align-middle');
        icon.id = bookNum;
        icon.addEventListener('click', (e) => {
            removeBook(e.target.id);
        });

        const toggle = document.createElement('button');
        toggle.id = bookNum;
        if (book.statusRead == true) {
            toggle.textContent = "read";
        } else toggle.textContent = "not read";
        toggle.addEventListener('click', (e) => {
            if (toggle.textContent == "read") {
                toggle.textContent = "not read";
            } else {
                toggle.textContent = "read";
            }
            toggleRead(e.target.id);
        });

        td.appendChild(toggle);
        td.appendChild(icon);
        tr.appendChild(td);
        bookNum += 1;        
    });   
};

function removeBook(id) {
    const bookRow = document.getElementById(id);
    bookRow.parentNode.removeChild(bookRow);
    myLibrary.splice(id, 1);
    bookNum -= 1;
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

    const book = new Book(title.value, author.value, numPages.value, read);
    addBookToLibrary(title.value, author.value, numPages.value, read);
    title.value = "";
    author.value = "";
    numPages.value = null;
    readStatus.value = "on";
}

addBookToLibrary("Walden", "Thoreau", 240, true);
addBookToLibrary("The Master and Margarita", "Bulgakov", 384, false);
addBookToLibrary("Teenage Mutant Ninja Turtles: The Ultimate Collection Volume 1", "Kevin Eastman, Peter Laird, Michael Dooney", 320, false);