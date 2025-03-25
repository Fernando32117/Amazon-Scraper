# 🛒 Amazon Scraper

Este projeto é um scraper de produtos da Amazon que extrai informações da primeira página de resultados de pesquisa com base em uma palavra-chave.

## 🛠️ Tecnologias utilizadas

### Backend/API (Bun)
- Utiliza **Bun** para gerenciar o backend e as dependências.
- Configurado com **Express** para criação da API.
- Utiliza **Axios** para requisições HTTP.
- **JSDOM** para análise e extração dos dados da página.
- Alternativa com **Puppeteer** (opção comentada no código).

### Frontend (Vite)
- Interface simples em **HTML, CSS e JavaScript** usando **Vite**.
- Permite ao usuário digitar uma palavra-chave, enviar a requisição e exibir os produtos retornados.

---

## ⚙️ Configuração do projeto

### 1️⃣ Pré-requisitos

Antes de começar, instale o **Bun** caso ainda não tenha:

# Windows
```bash
powershell -c "irm bun.sh/install.ps1 | iex"
```

# Linux e MacOs
```bash
curl -fsSL https://bun.sh/install | bash
```

### 2️⃣ Clonar o repositório

```bash
git clone https://github.com/Fernando32117/Amazon-Scraper.git
cd Amazon-scraper
```

### 3️⃣ Instalar as dependências
O projeto já está configurado para utilizar JSDOM por padrão. Para instalar as dependências, execute:
```bash
bun install
```

### 4️⃣ Iniciar o servidor backend
```bash
bun run dev
```

## 🚀 Executando o Frontend

### 1️⃣ Navegue até a pasta do frontend:
```bash
cd amazon-scraper-frontend
```

### 2️⃣ Instale as dependências do Vite:
```bash
bun install
```

### 3️⃣ Inicie o servidor de desenvolvimento:
```bash
bun run dev
```

### 4️⃣ Acesse no navegador:
🔗 http://localhost:5173

---

## 📌 Exemplo de uso da API
Para testar a API, basta fazer uma requisição GET para o endpoint /api/scrape passando a palavra-chave desejada como query parameter:

```bash
curl "http://localhost:3000/api/scrape?keyword=iphone"
```

Exemplo de resposta JSON:
```json
{
  "keyword": "iphone",
  "products": [
    {
      "title": "iPhone 13 Pro Max",
      "rating": "4.8",
      "reviews": "10,500",
      "imageUrl": "https://m.media-amazon.com/images/..."
    },
    {
      "title": "iPhone 12",
      "rating": "4.7",
      "reviews": "8,300",
      "imageUrl": "https://m.media-amazon.com/images/..."
    }
  ]
}
```

---

## 📌 Alternativa: Usando Puppeteer (Opcional)
Caso a Amazon carregue os produtos dinamicamente via JavaScript e o JSDOM não consiga capturá-los corretamente, você pode usar Puppeteer.

### 📦 Instalando Puppeteer
```bash
npm i puppeteer
```
OU
```bash
bun add puppeteer
```

### 📝 Como ativar o Puppeteer?
- No arquivo server.js, descomente a parte do código que usa Puppeteer.
- Comente a parte do código que usa JSDOM.

Isso permitirá que Puppeteer carregue a página como um navegador real, garantindo que os produtos sejam extraídos corretamente.

---
