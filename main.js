const contentElem = document.querySelector('.content');

const randomize_book_order = true;
const randomize_number_of_books = true;
let maximum_number_of_books = 999;

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
  }

  books = books.filter((m, i) => i < number_of_books);

  contentElem.innerHTML = `
    <div class="books">
        ${books
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
})();

function randomizeArray(arr) {
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
