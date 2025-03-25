import './style.css'

// Adiciona evento de clique no botão de busca
document.getElementById("scrape-btn").addEventListener("click", async () => {
  const keyword = document.getElementById("keyword").value;  // Obtém o valor digitado no campo de busca
  if (!keyword) {  // Verifica se a palavra-chave foi fornecida
      alert("Por favor, insira uma palavra-chave!");  // Exibe alerta caso não tenha sido fornecida
      return;
  }

  const resultsDiv = document.getElementById("results");  // Referência ao div de resultados
  resultsDiv.innerHTML = "<p>Buscando produtos...</p>";  // Exibe mensagem de carregamento

  try {
      // Faz a requisição ao backend para buscar os produtos
      const response = await fetch(`http://localhost:3000/api/scrape?keyword=${keyword}`);
      const data = await response.json();  // Converte a resposta para JSON

      console.log(data);  // Exibe os dados no console para verificação

      resultsDiv.innerHTML = "";  // Limpa os resultados anteriores

      if (!data.products || !Array.isArray(data.products) || data.products.length === 0) {
          resultsDiv.innerHTML = "<p>Nenhum produto encontrado.</p>";  // Exibe mensagem caso não haja produtos
          return;
      }

      // Exibe os produtos encontrados na interface
      data.products.forEach((product) => {
          const productDiv = document.createElement("div");
          productDiv.classList.add("product");
          productDiv.innerHTML = `
              <h2>${product.title}</h2>
              <p>⭐ ${product.rating} - 📢 ${product.reviews} avaliações</p>
              <img src="${product.imageUrl}" alt="${product.title}">
          `;
          resultsDiv.appendChild(productDiv);  // Adiciona o produto à lista de resultados
      });
  } catch (error) {
      resultsDiv.innerHTML = "<p>Erro ao buscar os produtos.</p>";  // Exibe mensagem de erro caso ocorra uma falha
      console.error(error);  // Log do erro no console
  }
});
