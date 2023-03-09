const getBooks = async () => {
  let books = [];
  await fetch("http://localhost:7000", { credentials: "include" })
    .then((response) => response.json())
    .then((data) => {
      books = data;
    })
    .catch((err) => console.log(err));
  console.log(books);
  return books;
};

const viewBooks = async () => {
  const booksContainer = document.getElementById("books-container");
  const wrapperDiv = document.createElement("div");
  let booksCounter = 0;
  for (const book of await getBooks()) {
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
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const genre = document.getElementById("genre").value;
  await fetch("http://localhost:7000", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      title: title,
      author: author,
      genre: genre,
    }),
  })
    .then(async (res) => {
      if (res.status === 201) {
        viewBooks();
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
  fetch("http://localhost:7000/deletebook", {
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

const search = () => {
  let text = document.getElementById("search").value;
  console.log(text);
};
