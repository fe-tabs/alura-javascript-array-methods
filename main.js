const booksAPI = 'https://guilhermeonrails.github.io/casadocodigo/livros.json';
const booksSection = document.getElementById('livros');
const totalSection = document.getElementById('valor_total_livros_disponiveis');
const buttons = document.querySelectorAll('button');
const orderBooksBtn = document.getElementById('btnOrdenarPorPreco');
let books = [];

buttons.forEach(btn => btn.addEventListener('click',
  filterBooks
));

orderBooksBtn.addEventListener('click', orderBooks);

async function getBooks() {
  const res = await fetch(booksAPI);
  books = await res.json();
  booksWithDiscount = applyDiscount(books);
  showBooks(booksWithDiscount);
}

function showBooks(books) {
  booksSection.innerHTML = '';
  totalSection.innerHTML = '';
  books.forEach(book => {
    let isAvailable = book.quantidade > 0;
    booksSection.innerHTML += `
      <div class="livro">
        <img 
          class="livro__imagens ${!isAvailable && 'indisponivel'}" 
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
  let filteredBooks = category == 'disponivel' ? 
    filterByAvailability() : 
    filterByCategory(category)
  ;
  showBooks(filteredBooks);
  if (category == 'disponivel') {
    const totalValue = filteredBooks.reduce((acc, book) => acc + book.preco, 0);
    totalSection.innerHTML = `
    <div class="livros__disponiveis">
      <p>Todos os livros disponíveis por 
      <span id="valor">
      ${
        new Intl.NumberFormat('pt-BR', { 
          style: 'currency', 
          currency: 'BRL'
        }).format(totalValue)
      }
      </span>
      </p>
    </div>
    `;
  }
}

function filterByCategory(category) {
  return books.filter(book => book.categoria == category);
}

function filterByAvailability() {
  return books.filter(book => book.quantidade > 0);
}

function orderBooks() {
  let orderedBooks = books.sort((a, b) => a.preco - b.preco);
  showBooks(orderedBooks);
}

getBooks();
