let library = [];
let tableBody;
let addButton;

function addToLocalStorage(item, index) {
    localStorage[index] = JSON.stringify(item);
}

function Book(bookTitle, author, pageCount, readStatus) {
    this.bookTitle = bookTitle;
    this.author = author;
    this.pageCount = pageCount;
    this.readStatus = readStatus;
}


function addBookToLibrary(bookTitle, author, pageCount, readStatus) {
    library.push(new Book(bookTitle, author, pageCount, readStatus));
}

function appendCheckbox(tableCell, checked) {
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = checked;
    tableCell.appendChild(checkbox);
}

function deleteBook(event) {
    let bookIndex = event.target.getAttribute('data');
    if (bookIndex == null) {
        bookIndex = event.target.parentNode.getAttribute('data');
        if (bookIndex == null) {
            bookIndex = event.target.parentNode.parentNode.getAttribute('data');
        }
    }
    library.splice(bookIndex, 1);

    render();
}

function createDeleteIcon(bookIndex) {
    deleteIcon = document.createElement('span');
    deleteIcon.classList.add('icon');
    deleteIcon.classList.add('has-text-danger');
    deleteIcon.innerHTML = `<i class="fas fa-trash"></i>`;
    deleteIcon.setAttribute('data', bookIndex);
    deleteIcon.addEventListener('click', deleteBook);
    return deleteIcon;
}

function render() {
    tableBody.innerHTML = "";
    for (let index in library) {
        let tableRow = document.createElement('tr');
        for (let key in library[index]) {
            let tableCell = document.createElement('td');
            if (key == "readStatus") {
                appendCheckbox(tableCell, library[index][key]);
            } else {
                tableCell.innerText = library[index][key];
            }
            tableRow.appendChild(tableCell);
        }
        tableRow.appendChild(createDeleteIcon(index));
        tableBody.appendChild(tableRow);
    }
}


function addBook(event) {
    event.preventDefault();

    let bookTitle = document.getElementById('book-title').value;
    let author = document.getElementById('author-name').value;
    let pageCount = document.getElementById('page-count').value;
    let readStatus = document.getElementById('read-status').checked;

    addBookToLibrary(bookTitle, author, pageCount, readStatus);
    render();
}

window.addEventListener('load', () => {
    tableBody = document.getElementsByTagName('tbody')[0];
    bookForm = document.getElementById('book-form');
    bookForm.addEventListener('submit', addBook);
    if (localStorage.hasOwnProperty('library')) {
        library = JSON.parse(localStorage.library);
        console.log(library);
        render();
    }
});

window.addEventListener('beforeunload', (event) => {
    localStorage.library = JSON.stringify(library);
});