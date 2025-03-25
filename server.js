////////////////////////////////////USANDO JSDOM ////////////////////////////////////
import express from "express";
import axios from "axios";
import { JSDOM } from "jsdom"; // Importando JSDOM para manipular o HTML da página
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors({ origin: "*" }));

// Definindo a rota para scraping
app.get("/api/scrape", async (req, res) => {
  const keyword = req.query.keyword?.trim(); // Obtendo a palavra-chave da query string
  if (!keyword) {
    return res.status(400).json({ error: "Keyword is required" }); // Validando se a palavra-chave foi fornecida
  }

  const amazonURL = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`; // URL de busca da Amazon com a palavra-chave

  try {
    console.log(`🔍 Scraping URL: ${amazonURL}`);

    // Usando axios para obter o HTML da página da Amazon com um cabeçalho de "User-Agent" para simular um navegador
    const { data } = await axios.get(amazonURL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:110.0) Gecko/20100101 Firefox/110.0",
      },
    });

    // Usando JSDOM para manipular o HTML da página que foi carregada com axios
    const dom = new JSDOM(data); // Criando uma instância do JSDOM para representar o conteúdo HTML da página
    const document = dom.window.document; // Obtendo o objeto document do JSDOM (semelhante ao document no navegador)

    const products = []; // Array para armazenar os produtos encontrados

    // Selecionando os elementos da página que representam os produtos
    document.querySelectorAll("[data-component-type='s-search-result']").forEach((item) => {
      const title = item.querySelector(".a-text-normal")?.textContent.trim() || "N/A"; // Título do produto
      const rating =
        item.querySelector(".a-icon-alt")?.textContent?.trim() || "N/A"; // Avaliação do produto
      const reviews =
        item.querySelector(".a-size-small .a-link-normal")?.textContent?.trim() || "0"; // Número de avaliações
      const imageUrl = item.querySelector(".s-image")?.src || ""; // URL da imagem do produto

      // Adicionando o produto ao array de resultados
      products.push({ title, rating, reviews, imageUrl });

    });

    // Log para verificar os produtos encontrados
    console.log(products);

    // Enviando a resposta de volta ao frontend com a palavra-chave e os produtos encontrados
    res.json({ keyword, products });
  } catch (error) {
    // Se ocorrer um erro durante o scraping, retorna uma mensagem de erro
    console.error("❌ Erro ao buscar na Amazon:", error.message, error.stack); // Log detalhado do erro
    res.status(500).json({ error: "Falha ao buscar na Amazon. Tente novamente mais tarde." });
  }
});

// Rota para evitar o erro 404 ao tentar acessar favicon
app.get("/favicon.ico", (_req, res) => res.status(204).end());

// Inicializando o servidor na porta especificada
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});



////////////////////////////////////USANDO puppeteer ////////////////////////////////////

// import express from "express";
// import puppeteer from "puppeteer";
// import cors from "cors";

// const app = express();
// const PORT = 3000;

// // Habilita CORS para todas as origens, permitindo que o frontend acesse o servidor
// app.use(cors({ origin: "*" }));

// // Endpoint para realizar o scraping dos produtos
// app.get("/api/scrape", async (req, res) => {  
//     const keyword = req.query.keyword?.trim();  // Obtém o valor da palavra-chave a partir da query string
//     if (!keyword) {  // Verifica se a palavra-chave foi fornecida
//         return res.status(400).json({ error: "Keyword is required" });  // Retorna erro 400 se a palavra-chave não for fornecida
//     }

//     const amazonURL = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;  // Formata a URL de busca na Amazon

//     try {  
//         console.log(`🔍 Scraping URL: ${amazonURL}`);  // Log para verificar qual URL está sendo acessada

//         // Iniciando o Puppeteer para fazer scraping no site da Amazon
//         const browser = await puppeteer.launch({ headless: true });  // headless: true para não abrir o navegador visível
//         const page = await browser.newPage();  // Cria uma nova página
//         await page.goto(amazonURL, { waitUntil: "domcontentloaded" });  // Navega até a URL e espera o conteúdo ser carregado

//         // Extrai os dados dos produtos da página usando o Puppeteer
//         const products = await page.evaluate(() => {
//             const productElements = document.querySelectorAll("[data-component-type='s-search-result']");  // Seleciona os elementos dos produtos
//             const products = [];
            
//             productElements.forEach(item => {
//                 // Extrai título, classificação, número de avaliações e URL da imagem
//                 const title = item.querySelector(".a-text-normal")?.textContent.trim() || "N/A";
//                 const rating = item.querySelector(".a-icon-alt")?.textContent?.trim() || "N/A";
//                 const reviews = item.querySelector(".a-size-small .a-link-normal")?.textContent?.trim() || "0";
//                 const imageUrl = item.querySelector(".s-image")?.src || "";
                
//                 products.push({ title, rating, reviews, imageUrl });  // Adiciona as informações do produto ao array
//             });

//             return products;  // Retorna a lista de produtos extraídos
//         });

//         // Fechar o navegador após o scraping
//         await browser.close();

//         // Log para verificação
//         console.log(`✅ Produtos encontrados: ${products.length}`);
//         console.log(products);  // Exibe os produtos extraídos no console

//         // Retorna os produtos encontrados para o frontend
//         res.json({ keyword, products });  
//     } catch (error) {  
//         console.error("❌ Erro ao buscar na Amazon:", error.message, error.stack);  // Log detalhado do erro
//         res.status(500).json({ error: "Falha ao buscar na Amazon. Tente novamente mais tarde." });  // Retorna erro 500 em caso de falha
//     }  
// });

// app.get("/favicon.ico", (_req, res) => res.status(204).end());  // Ignora requisição para favicon

// // Inicia o servidor na porta 3000
// app.listen(PORT, () => {
//   console.log(`Server is running at http://localhost:${PORT}`);
// });
