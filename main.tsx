const contentElem = document.querySelector('.content');

interface IBook {
  idCode: string;
  title: string;
  description: string;
}

const randomize_book_order = true;
const randomize_number_of_books = true;
let maximum_number_of_books = 10;
let _books = [];

(async () => {
  const response = await fetch(
    'https://edwardtanguay.vercel.app/share/techBooks.json'
  );
  const rawBooks = await response.json();

  let books = [];

  if (randomize_book_order) {
    books = randomizeArray(rawBooks);
  } else {
    books = [...rawBooks];
  }

  maximum_number_of_books =
    books.length < maximum_number_of_books
      ? books.length
      : maximum_number_of_books;

  let number_of_books = maximum_number_of_books;

  if (randomize_number_of_books) {
    number_of_books = Math.floor(Math.random() * maximum_number_of_books) + 1;
    console.log(number_of_books);
  }

  // books = books.filter((m, i) => i < number_of_books);
  for (let i = 0; i < number_of_books; i++) {
    // const element = array[i];
    // books = books[i];
    _books[i] = books[i];
  }

  console.log(_books);

  if (contentElem !== null) {
    contentElem.innerHTML = `
    <div class="books">
    ${_books
      .map((book) => {
        return `
            <div class="book">
            <img src="https://edwardtanguay.vercel.app/share/images/techBooks/${book.idCode}.jpg" />
            <div class="info">
            <div class="title">${book.title}</div>
            <div class="description">${book.description}</div>
            </div>
            </div>
            `;
      })
      .join('')}
          </div>
          `;
  }
})();

function randomizeArray(arr: IBook[]) {
  let currentIndex = arr.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ];
  }
  return arr;
}
