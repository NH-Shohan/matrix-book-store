// spinner function
const toggleSpinner = (displayStyle) => {
  document.getElementById("spinner").style.display = displayStyle;
};

// Toggle books search function
const toggleSearchBooks = (displayBookStyle) => {
  document.getElementById("books").style.display = displayBookStyle;
};

// error message function
const errorMessage = (displayMessage) => {
  document.getElementById("error-message").style.display = displayMessage;
};

// display toggle book search
document.getElementById("display").style.display = "block";

// search books function
const searchBook = () => {
  const searchText = document.getElementById("search-field").value;
  document.getElementById("search-field").value = "";
  // display spinner for search
  toggleSpinner("block");
  // hide error message
  errorMessage("none");
  // hide toggle book search
  document.getElementById("display").style.display = "none";
  loadBook(searchText);
};

// load books function
const loadBook = (searchText) => {
  const url = `https://openlibrary.org/search.json?q=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      dispalayBook(data.docs);
      // display toggle book search
      document.getElementById("display").style.display = "block";
    });
};

// display book function
const dispalayBook = (books) => {
  const container = document.getElementById("books");
  container.textContent = "";

  // Total result count
  const result = document.getElementById("result-count");
  result.innerHTML = `<h3 class="d-flex justify-content-center mb-4">Total result found: ${books.length}</h3>`;

  // condition to check empty search box
  if (books.length === 0) {
    errorMessage("block");
    toggleSpinner("none");
  } else {
    books.forEach((book) => {
      const div = document.createElement("div");
      div.classList.add("col");

      // image to display
      let link;
      if (book.cover_i) {
        link = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
      } else {
        link = `image/No-book.jpg`;
      }

      // name to display
      let bookName;
      if (book.title) {
        bookName = `${book.title}`;
      } else {
        bookName = `No Book Name`;
      }

      // author name to display
      let authorName;
      if (book.author_name) {
        authorName = `${book.author_name[0]}`;
      } else {
        authorName = `No Author Name`;
      }

      // publisher name to display
      let publisherName;
      if (book.publisher) {
        publisherName = `${book.publisher[0]}`;
      } else {
        publisherName = `No Publisher Name`;
      }

      // First published date to display
      let publishedDate;
      if (book.first_publish_year) {
        publishedDate = `${book.first_publish_year}`;
      } else {
        publishedDate = `No Published Date`;
      }

      // Inner HTML for Books
      div.innerHTML = `
      <div class="card h-100 rounded-3 card-book-container">
        <img src="${link}" class="card-img-top" alt="Book Image">
        <div class="card-body">
          <h3 class="card-title">${bookName}</h3>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Author: ${authorName}</li>
          <li class="list-group-item">Publisher: ${publisherName}</li>
          <li class="list-group-item">Published: ${publishedDate}</li>
        </ul> 
      </div>
    `;
      container.appendChild(div);
    });
    toggleSpinner("none");
  }
};
