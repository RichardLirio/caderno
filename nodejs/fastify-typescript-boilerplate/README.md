⚡ Iniciando um projeto Node.js com Fastify e TypeScript
Caminho sugerido: /nodejs/fastify-typescript-boilerplate

📦 1. Inicialize o projeto
```bash
npm init -y
#Isso cria o package.json básico.
```

🔧 2. Instale as dependências
📌 Dependências de produção
```bash
npm install fastify
fastify: framework web ultrarrápido, alternativo ao Express.
```

📌 Dependências de desenvolvimento
```bash
npm install -D typescript ts-node-dev @types/node
```
Explicação:

Pacote	Função
typescript	Compilador TypeScript
ts-node-dev	Executa arquivos .ts com hot reload em dev
@types/node	Tipagens para objetos nativos do Node.js (ex: process, fs, etc.)

🛠 3. Configure o tsconfig.json
```bash
npx tsc --init
```
Altere as opções principais para este conteúdo:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "skipLibCheck": true
  }
}
```

📁 4. Estrutura de pastas recomendada
```pgsql
Copiar
Editar
fastify-typescript-boilerplate/
├── src/
│   └── server.ts
├── tsconfig.json
├── package.json
├── .gitignore
└── README.md
```

🧠 5. Crie o servidor em src/server.ts
```ts
import Fastify from 'fastify';

const app = Fastify();

app.get('/', async () => {
  return { message: 'Hello from Fastify + TypeScript!' };
});

app.listen({ port: 3000 }, () => {
  console.log('🚀 Server running at http://localhost:3000');
});
```

🧪 6. Adicione os scripts no package.json
```json
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js"
}
```
✅ 7. Execute o projeto
Modo desenvolvimento:

```bash
npm run dev
```

Build para produção:

```bash
npm run build
```
Rodar projeto compilado:
```bash
npm start
```