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
    return `${this.title} by ${this.author}, ${this.numPages}, ${this.statusRead}`;
}

function addBookToLibrary(title, author, numPages, statusRead) {
    myLibrary.push(new Book(title, author, numPages, statusRead));
}

const bookElem = document.querySelector("tbody");

function displayLibrary() {
    myLibrary.forEach((book) => {
        const tr = document.createElement('tr');
        bookElem.appendChild(tr);
        const td = document.createElement('td');
        td.textContent = book.info();
        tr.appendChild(td);
    });   
};

const form = document.getElementById("form");
console.log(form);

const newBook = document.getElementById("new-book");
newBook.addEventListener('click', () => {
    form.classList.remove("hidden");
});

const formX = document.getElementById("close");
formX.addEventListener('click', () => {
    form.classList.add("hidden");
});

// $('#new-book').on('click', function () {
//     $('.center').show();
// })

// $('#close').on('click', function () {
//     $('.center').hide();
// })

addBookToLibrary("Walden", "Thoreau", 240, true);
addBookToLibrary("Some book", "Some author", 240, false);
console.log(myLibrary[0].info());
displayLibrary();
