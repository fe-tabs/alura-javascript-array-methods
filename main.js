const booksAPI = 'https://guilhermeonrails.github.io/casadocodigo/livros.json';
const booksSection = document.getElementById('livros');

let books = [];

async function getBooks() {
  const res = await fetch(booksAPI);
  books = await res.json();
  showBooks(books);
  console.table(books);
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

getBooks();
