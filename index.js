const BASIC_URL = "http://localhost:7000";

const getBooks = async () => {
  let books = [];
  await fetch(BASIC_URL, { credentials: "include" })
    .then((response) => response.json())
    .then((data) => {
      books = data;
    })
    .catch((err) => console.log(err));
  console.log(books);
  booksList = books;
  return books;
};

let booksList = getBooks();

const viewBooks = async () => {
  await getBooks();
  let text = document.getElementById("search").value;
  let filteredBooks = booksList.filter((book) =>
    book.title.toLowerCase().includes(text.toLowerCase())
  );

  const booksContainer = document.getElementById("books-container");
  const wrapperDiv = document.createElement("div");
  let booksCounter = 0;

  for (const book of filteredBooks) {
    booksCounter++;
    const bookDiv = document.createElement("div");

    const p1 = document.createElement("p");
    const title = document.createTextNode(book.title);
    p1.appendChild(title);
    bookDiv.appendChild(p1);

    const p2 = document.createElement("p");
    const autor = document.createTextNode(book.author);
    p2.appendChild(autor);
    bookDiv.appendChild(p2);

    const p3 = document.createElement("p");
    const genre = document.createTextNode(book.genre);
    p3.appendChild(genre);
    bookDiv.appendChild(p3);

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "delete-button");
    deleteButton.innerText = "DEL";
    bookDiv.appendChild(deleteButton);

    bookDiv.setAttribute("identifier", `${book._id}`);
    bookDiv.setAttribute("class", "book-card");

    wrapperDiv.appendChild(bookDiv);
  }
  booksContainer.innerHTML = wrapperDiv.innerHTML;
  for (let i = 0; i < booksCounter; i++) {
    let card = document.getElementsByClassName("book-card")[i];
    let deleteButton = document.getElementsByClassName("delete-button")[i];
    deleteButton.addEventListener("click", () => {
      deleteBook(card.getAttribute("identifier"));
    });
  }
};

const addBook = async () => {
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const genre = document.getElementById("genre");
  await fetch(BASIC_URL, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      title: title.value,
      author: author.value,
      genre: genre.value,
      cover:
        "https://taralazar.files.wordpress.com/2015/05/wolfie.jpg?w=350&h=353",
    }),
  })
    .then(async (res) => {
      if (res.status === 201) {
        viewBooks();
        title.value = "";
        author.value = "";
        genre.value = "";
      } else if (res.status === 200) {
        const json = await res.json();
        alert(json.details[0].message);
      } else {
        alert("Sorry Error happened please try again");
      }
    })
    .catch((err) => console.log(err));
};

const deleteBook = (id) => {
  fetch(BASIC_URL, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      id: id,
    }),
  })
    .then(async (res) => {
      if (res.status === 200) {
        viewBooks();
      } else {
        alert("Sorry Error happened please try again");
      }
    })
    .catch((err) => console.log(err));
};
