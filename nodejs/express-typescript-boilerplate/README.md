# 🧪 Express + TypeScript Boilerplate

Este exemplo demonstra como iniciar um projeto Node.js utilizando o framework **Express** com **TypeScript**, ideal para construir APIs modernas com tipagem estática e boa estrutura desde o início.

---

## 📌 Objetivo

Configurar um ambiente de desenvolvimento com:

- [x] Express.js
- [x] TypeScript
- [x] ts-node-dev para desenvolvimento com hot reload
- [x] Tipos para Node e Express
- [x] Estrutura básica e escalável

---

## ✅ Pré-requisitos

- [Node.js](https://nodejs.org) instalado (recomendado: versão 18+)
- npm ou yarn

---

## 📦 Instalação

Clone o repositório e acesse a pasta:

```bash
git clone https://github.com/seu-usuario/caderno.git
cd caderno/nodejs/express-typescript-boilerplate
```

Instale as dependências:

```bash
npm install
🚀 Scripts disponíveis
Comando	Descrição
npm run dev	Inicia o servidor em modo desenvolvimento
npm run build	Compila o TypeScript para a pasta dist
npm start	Executa o código compilado em produção
```

📁 Estrutura de arquivos
```pgsql
express-typescript-boilerplate/
├── src/
│   └── server.ts
├── dist/
├── tsconfig.json
├── package.json
└── README.md
```

🧪 Exemplo de código
src/server.ts
```ts
import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, Express + TypeScript!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

```

🛠 tsconfig.json básico
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true
  }
}
```
