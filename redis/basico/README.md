# 📘 Estudo de Redis com Node.js

Bem-vindo ao repositório dedicado ao estudo do **Redis** com **Node.js**! Este projeto foi criado para solidificar conhecimentos sobre o uso de Redis como um sistema de cache em memória, integrado a uma aplicação Node.js com Express. Aqui, você encontrará uma implementação prática que demonstra como utilizar Redis para otimizar o desempenho de uma API, reduzindo o tempo de resposta por meio de caching.

## 🎯 Objetivo

O objetivo deste repositório é explorar o conceito de **cache** com Redis, utilizando-o para armazenar resultados de operações demoradas (como chamadas a banco de dados) e evitar processamento redundante. O exemplo implementado simula uma API que retorna uma lista de produtos, utilizando Redis para armazenar os resultados em cache e reduzir o tempo de resposta para requisições subsequentes.

---

## 💡 O que é Redis?

**Redis** (Remote Dictionary Server) é um banco de dados em memória, extremamente rápido, que opera com estruturas de dados baseadas em chave-valor. Ele é amplamente utilizado para caching, gerenciamento de sessões, filas e outras aplicações que exigem alta performance. Por armazenar dados na memória RAM, o Redis é significativamente mais rápido que bancos de dados baseados em disco.

### Características principais do Redis:
- **Alta performance**: Operações em memória tornam o acesso a dados extremamente rápido.
- **Chave-valor**: Dados são armazenados como pares de chave e valor, simplificando o acesso.
- **TTL (Time To Live)**: Permite configurar expiração automática para dados em cache.
- **Flexibilidade**: Suporta diversas estruturas de dados, como strings, listas, conjuntos, hashes, etc.

---

## 🚀 Exemplo Prático

O projeto contém uma API simples construída com **Express** e **Javascript**, que utiliza o Redis para armazenar em cache o resultado de uma função simulada (`getAllProducts`). A ideia é demonstrar como o cache pode reduzir o tempo de resposta de uma requisição, evitando chamadas repetitivas a recursos lentos (como um banco de dados).

### Estrutura do Código

O código principal está no arquivo `server.js`:

```javascript
import express from "express";
import { createClient } from "redis";
const app = express();
const port = 3000;

const redisClient = createClient({
  url: "redis://localhost:6379",
  password: "@a123456",
}); // Criando o client do redis

// Metodo para exemplificar uma chamada para o banco de dados ou algum outro recurso que demande bastante tempo
const getAllProducts = async () => {
  const time = Math.random() * 5000;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["Produto 1", "Produto 2", "Produto 3"]);
    }, time); // função que irá variar o tempo de retorno.
  });
};

// Calculo para determinar o uso do cache ou não e quanto tempo deixar ele em cache:
// 100 requisições por minuto no servidor , que em media leva de 3 a 4 segundos para retornar
// 100 * 4s = 400 segundos de tempo medio.
// Se eu colocar em cache por 20 segundos, somente a primeira requisição das mesmas 100 irá demorar 4 segundos e as restantes serem exponencialmente mais rapidas
// Calculo tempo recurso = 6*2 = 12 segundos de tempo medio
// aplicar o redis para o cache a side. Utilizando o cache ao lado do servidor para verificar as chamadas antes de bater na fonte de dados em disco
// Redis trabalha a nivel de memoria ram, por isso é mais rapido
// Redis é baseado em keys e values, do tipo chave valor para guardar as informações de acordo com as chaves, atraves de set e get

// rota utilizada para solicitação de recursos
app.get("/", async (req, res) => {
  const productsFromCache = await redisClient.get("getAllProducts"); // busco dentro do meu cache se a chave referente ao recurso existe
  if (productsFromCache) {
    // caso ela exista
    const products = JSON.parse(productsFromCache);
    return res.send({ products }); // retorno todo o conteudo do meu cache evitando o tempo de busca pelo recurso na fonte
  }
  // caso não exista
  const products = await getAllProducts(); // busco o meu recurso na fonte
  await redisClient.set("getAllProducts", JSON.stringify(products), {
    expiration: { type: "EX", value: 20 }, // TTL(TIME TO LIVE) : Configuração para o tempo que eu desejo que o recurso fique disponivel no cache em segundos
  }); // Salvo o recurso dentro do redis para as proximas solicitações
  res.send({ products }); // retorno os produtos buscados na fonte
});

// rota para salvar um novo recurso somente para fins de estudo
app.get("/saved", async (_, res) => {
  await redisClient.del("getAllProducts");
  res.send({ ok: true });
});

const startup = async () => {
  await redisClient.connect(); // realizo a conexão com o redis
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
};

startup(); // iniciando o server
```

### Explicação do Código

1. **Configuração do Redis**:
   - O cliente Redis é criado com a biblioteca `redis` (`createClient`), configurado para conectar ao Redis em `redis://localhost:6379` com a senha `@a123456`.
   - A conexão é estabelecida no início do servidor com `redisClient.connect()`.

2. **Simulação de Operação Demorada**:
   - A função `getAllProducts` simula uma chamada a um recurso lento (como um banco de dados), com um tempo de resposta aleatório de até 5 segundos.
   - Ela retorna uma lista estática de produtos: `["Produto 1", "Produto 2", "Produto 3"]`.

3. **Lógica de Cache**:
   - Na rota principal (`GET /`), o servidor verifica se a chave `getAllProducts` existe no Redis.
   - Se encontrada, o resultado em cache é retornado imediatamente, evitando a chamada à função `getAllProducts`.
   - Caso contrário, a função `getAllProducts` é executada, e o resultado é armazenado no Redis com um **TTL de 20 segundos** usando `redisClient.set` com a opção `expiration`.

4. **Rota de Limpeza de Cache**:
   - A rota `GET /saved` limpa a chave `getAllProducts` do Redis, permitindo testar o comportamento sem cache.

5. **Benefícios do Cache**:
   - O código inclui um cálculo teórico comentado que demonstra a economia de tempo com o cache, explicado em detalhes abaixo.

---

## 📊 Cálculo de Tempo de Recurso

O código inclui um cálculo teórico para ilustrar o ganho de desempenho ao usar o cache do Redis:

- **Cenário sem cache**:
  - Suponha 100 requisições por minuto a uma API, onde cada requisição leva, em média, **3 a 4 segundos** para ser processada (devido à função `getAllProducts` simulando uma chamada a banco de dados).
  - Tempo total médio: **100 × 4s = 400 segundos** (ou ~6,67 minutos).

- **Cenário com cache**:
  - Com o cache configurado para um TTL de **20 segundos**, apenas a **primeira requisição** de cada janela de 20 segundos precisa buscar os dados da fonte (média de 4 segundos).
  - As requisições subsequentes dentro dessa janela de 20 segundos obtêm os dados do cache, que é significativamente mais rápido (próximo de 0 segundos, já que o Redis opera em memória).
  - Suponha que, em 1 minuto, cerca de 6 janelas de 20 segundos ocorram (60 ÷ 20 = 3, mas considerando múltiplos acessos). Cada janela tem uma requisição inicial que leva ~4 segundos, totalizando **6 × 2 = 12 segundos** de tempo médio para 100 requisições.

- **Ganho**:
  - Sem cache: **400 segundos**.
  - Com cache: **~12 segundos**.
  - **Redução de tempo**: Aproximadamente **97%** (de 400s para 12s), tornando a API exponencialmente mais rápida.

Esse cálculo demonstra como o Redis, ao operar como um cache ao lado do servidor ("cache-aside"), reduz drasticamente o tempo de resposta, especialmente em cenários com muitas requisições repetitivas.

---

## 🛠 Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para o backend.
- **Express**: Framework para construção da API.
- **Redis**: Banco de dados em memória para caching.
- **Docker**: Para configurar e rodar o Redis de forma consistente.

---

## 🧪 Como Rodar o Projeto

### Pré-requisitos
- **Node.js** (versão 16 ou superior)
- **Docker** e **Docker Compose** (para rodar o Redis)
- **npm** (para instalar dependências)

### Passos

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/caderno.git
   cd redis/basico
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure o Redis com Docker**:
   - O projeto inclui um arquivo `docker-compose.yml` para configurar o Redis. Inicie-o com:
     ```bash
     cd..
     docker-compose up -d
     ```
   - O arquivo `docker-compose.yml` configura o Redis com a imagem `bitnami/redis:latest`, usando a senha `@a123456` e a porta `6379`. Ele também define um volume persistente e um healthcheck.

   ```yaml
   services:
     redis:
       image: 'bitnami/redis:latest'
       environment:
         - REDIS_PASSWORD=@a123456
       command:
         - redis-server
         - --requirepass
         - '@a123456'
         - --dir
         - /bitnami/redis/data
       ports:
         - "6379:6379"
       volumes:
         - redis-data:/bitnami/redis/data
       healthcheck:
         test: ["CMD", "redis-cli", "-a", "@a123456", "ping"]
         interval: 10s
         timeout: 5s
         retries: 5
         start_period: 5s
       
   volumes:
     redis-data:
   ```

   - Verifique se o Redis está ativo:
     ```bash
     docker-compose ps
     ```

4. **Inicie a aplicação**:
   ```bash
   npm run dev
   ```

5. **Teste a API**:
   - Use o arquivo `client.http` fornecido para testar as rotas com ferramentas como o **VS Code com REST Client** ou similares:

   ```http
   # @name Busca_recurso
   GET http://localhost:3000
   Content-Type: application/json
   ```

   ```http
   # @name Salva_e_limpa_cache
   GET http://localhost:3000/saved
   Content-Type: application/json
   ```

   - **Observe o tempo de resposta**:
     - Na primeira execução do `Busca_recurso`, note que a resposta pode levar até **5 segundos** devido à simulação da função `getAllProducts`.
     - Execute novamente dentro de 20 segundos e observe que a resposta é **quase instantânea**, pois os dados são retornados do cache do Redis.
     - Use o `Salva_e_limpa_cache` para limpar o cache e testar o comportamento sem cache novamente.

---

## 📁 Estrutura do Projeto

```plaintext
└── redis
    └── basico
        ├── README.md
        ├── client.http
        ├── package-lock.json
        ├── package.json
        └── server.js
```

---

## 📌 Conceitos Demonstrados

- **Cache com Redis**: Uso de Redis para armazenar resultados de operações demoradas, reduzindo o tempo de resposta.
- **TTL (Time To Live)**: Configuração de expiração de 20 segundos para dados em cache, otimizando uso de memória.
- **Chave-valor**: Armazenamento de dados como pares chave-valor (`getAllProducts` como chave, lista de produtos como valor).
- **Integração com Express**: Configuração de uma API simples que verifica o cache antes de processar requisições.
- **Docker para Redis**: Configuração de um ambiente Redis consistente com `docker-compose.yml`.
- **Testes práticos**: Uso de `client.http` para testar o impacto do cache no tempo de resposta.

---

## 🔍 Considerações Adicionais

- **Performance**: O Redis opera em memória, tornando-o ideal para cenários onde a latência é crítica.
- **Escalabilidade**: O cache pode ser facilmente integrado em sistemas distribuídos, com Redis como camada centralizada.
- **Manutenção do Cache**: A rota `/saved` permite invalidar o cache manualmente, útil para cenários onde os dados da fonte mudam.
- **Extensibilidade**: A lógica pode ser adaptada para cachear diferentes tipos de dados ou integrar com bancos de dados reais.

Este repositório é uma base prática para entender como o Redis pode ser usado para caching em aplicações Node.js, com foco em simplicidade, clareza e demonstração prática de ganhos de desempenho.