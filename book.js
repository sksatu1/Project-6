const getInputText = () => {
    const inputField = document.getElementById('search-field');
    const inputText = inputField.value;
    loadBooks(inputText);
    inputField.value = '';
    // console.log(inputText);
}

// load search result ---------------------------------------------------------
const loadBooks = bookName => {
    const url = `https://openlibrary.org/search.json?q=${bookName}`;
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data.numFound, data.docs.slice(0, 3)))
}

// display search result ---------------------------------------------------------
const displayBooks = (noOfBooks, books) => {
    console.log(noOfBooks, books);
    const booksContainer = document.getElementById('display-books');
    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
                    <img src="" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to
                            additional content. This content is a little bit longer.</p>
                    </div>
                </div>
        `;
        booksContainer.appendChild(div);
    });
}