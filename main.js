const booksAPI = 'https://guilhermeonrails.github.io/casadocodigo/livros.json';
const booksSection = document.getElementById('livros');
const buttons = document.querySelectorAll('button');

let books = [];

buttons.forEach(btn => btn.addEventListener('click',
  filterBooks
));

async function getBooks() {
  const res = await fetch(booksAPI);
  books = await res.json();
  booksWithDiscount = applyDiscount(books);
  showBooks(booksWithDiscount);
}

function showBooks(books) {
  books.forEach(book => {
    booksSection.innerHTML += `
      <div class="livro">
        <img 
          class="livro__imagens" 
          src="${book.imagem}" 
          alt="${book.alt}" 
        />
        <h2 class="livro__titulo">
          ${book.titulo}
        </h2>
        <p class="livro__descricao">${book.autor}</p>
        <p class="livro__preco" id="preco">
          ${
            new Intl.NumberFormat('pt-BR', { 
              style: 'currency', 
              currency: 'BRL'
            }).format(book.preco)
          }
        </p>
        <div class="tags">
          <span class="tag">${book.categoria}</span>
        </div>
      </div>
    `;
  })
}

function applyDiscount(books) {
  const discount = 0.3;
  booksWithDiscount = books.map(book => {
    return {
      ...book,
      preco: book.preco * (1 - discount)
    }
  })
  return booksWithDiscount;
}

function filterBooks() {
  const btn = document.getElementById(this.id);
  const category = btn.value; 
  let filteredBooks = books.filter(book => {
    return book.categoria == category;
  });
  booksSection.innerHTML = '';
  showBooks(filteredBooks);
}

getBooks();
