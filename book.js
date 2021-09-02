const getInputText = () => {
    const inputField = document.getElementById('search-field');
    const inputText = inputField.value;
    loadBooks(inputText);
    inputField.value = '';

    document.getElementById('noOfSearchResult').textContent = '';

    document.getElementById('display-books').textContent = '';

    errorMessage('none');

    toggler('block');
}

// toggler -------------------------------------------------------------------
const toggler = (spinnerDisplayStyle) => {
    document.getElementById('spinner-display-style').style.display = spinnerDisplayStyle;
}


// load search result ---------------------------------------------------------
const loadBooks = bookName => {
    const url = `https://openlibrary.org/search.json?q=${bookName}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data.numFound, data.docs.slice(0, 9)))
        .catch(error => console.log(error))
}

// display error message -------------------------------------------------------
const errorMessage = (displayStyle) => {
    document.getElementById('error-message').style.display = displayStyle;
}

// display search result ---------------------------------------------------------
const displayBooks = (noOfBooks, books) => {
    if (noOfBooks === 0 && books.length === 0) {
        toggler('none');
        // show error message ------------------------
        errorMessage('block');
    }

    else {
        // clear error message-----------------------
        errorMessage('none');

        const displayNoOfResult = document.getElementById('noOfSearchResult');
        displayNoOfResult.innerText = `${noOfBooks} results found`

        const booksContainer = document.getElementById('display-books');

        books.forEach(book => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
        <div class="card h-100 book-style">
                    <img height="500px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="No cover page found">
                    <div class="card-body">
                        <h5 class="card-title">Book Name : ${book.title}</h5>
                        <p class="card-text">Author : ${book.author_name ? book.author_name : ''}</p>
                        <p class="card-text">Publisher : ${book.publisher}</p>
                        <p class="card-text">First publish : ${book.first_publish_year}</p>
                    </div>
                </div>
        `;
            booksContainer.appendChild(div);
            toggler('none');
        });

    }
}