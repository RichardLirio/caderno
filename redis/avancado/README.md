# 📘 Estudo Avançado de Cache com Redis: Stale-While-Revalidate

Bem-vindo ao repositório dedicado ao estudo avançado do **Redis** com **Node.js**, com foco na estratégia de cache **stale-while-revalidate**. Este projeto aprofunda o uso de Redis como um sistema de cache em memória, integrado a uma aplicação Node.js com Express, para otimizar o desempenho de APIs e resolver problemas comuns de caching, como múltiplas requisições simultâneas à fonte de dados.

## 🎯 Objetivo

O objetivo deste repositório é demonstrar a implementação do padrão **stale-while-revalidate** em uma API, utilizando Redis para gerenciar cache de forma eficiente. Este padrão permite que dados desatualizados (stale) sejam retornados do cache enquanto uma atualização ocorre em segundo plano, evitando sobrecarga na fonte de dados e garantindo respostas rápidas.

---

## 💡 O que é Stale-While-Revalidate?

**Stale-while-revalidate** é uma estratégia de cache que permite servir dados possivelmente desatualizados (stale) do cache enquanto uma tarefa em segundo plano atualiza os dados. Isso é útil em cenários onde a latência é crítica e os dados não precisam estar 100% atualizados em todas as requisições. O Redis, com sua alta performance e suporte a TTL (Time To Live), é ideal para implementar essa estratégia.

### Características principais:
- **Alta performance**: Retorna dados do cache mesmo após o TTL expirar, enquanto atualiza em segundo plano.
- **Controle de concorrência**: Evita múltiplas requisições simultâneas à fonte de dados.
- **Flexibilidade**: Usa chaves adicionais no Redis para gerenciar o estado do cache (válido, desatualizado, ou em atualização).

---

## 📊 Cenário Atual e Problemas

No cenário básico de cache (implementado em [redis-study](../redis-study)), a lógica é:

1. A **primeira requisição** busca o recurso da fonte (ex: banco de dados) e armazena no Redis.
2. As **requisições subsequentes** dentro do TTL (ex: 20 segundos) obtêm os dados do cache, reduzindo o tempo de resposta.
3. Quando o TTL expira, o recurso é removido do Redis, e a próxima requisição precisa buscar novamente na fonte.
4. **Problema**: Se múltiplas requisições chegarem simultaneamente após o TTL expirar, todas tentarão acessar a fonte e recriar o cache ao mesmo tempo, causando sobrecarga (conhecido como **cache stampede**).

### Cenário Desejado (Stale-While-Revalidate)

1. A **primeira requisição** busca o recurso da fonte e armazena no Redis com uma chave de validação.
2. As **requisições subsequentes** obtêm os dados do cache, mesmo após o TTL da validação expirar (estado stale).
3. Quando o cache entra em estado stale, o recurso desatualizado é retornado, enquanto uma tarefa em segundo plano atualiza o cache.
4. Uma chave de controle (`isRefetching`) evita que múltiplas requisições disparem atualizações simultâneas.
5. O processo se repete, garantindo respostas rápidas e atualizações controladas.

### Benefícios:
- **Respostas instantâneas**: Dados stale são servidos do cache, evitando atrasos.
- **Prevenção de sobrecarga**: Apenas uma tarefa atualiza o cache, mesmo com múltiplas requisições simultâneas.
- **Eficiência**: O Redis gerencia o estado do cache com chaves adicionais.

---

## 🚀 Exemplo Prático

O projeto implementa uma API com **Express** e **Redis**, aplicando o padrão **stale-while-revalidate** para gerenciar o cache de uma lista de produtos. A função `getAllProducts` simula uma chamada demorada (até 10 segundos), e o Redis armazena os resultados, controlando o estado do cache com chaves adicionais.

### Estrutura do Código

O código principal está no arquivo `server.js`:

```typescript
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
  const time = Math.random() * 10000;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["Produto 1", "Produto 2", "Produto 3"]);
    }, time); // função que irá variar o tempo de retorno.
  });
};

//rota utilizada para solicitação de recursos
app.get("/", async (req, res) => {
  const productsFromCache = await redisClient.get("getAllProducts"); //busco dentro do meu cache se a chave referente ao recurso existe
  const isProductsFromCacheStale = !(await redisClient.get(
    "getAllProducts:validation"
  )); // Variavel guardada em cache para verificar se esses dados do cache estão obsoletos

  if (isProductsFromCacheStale) {
    const isRefetching = !!(await redisClient.get(
      "getAllProducts:isRefetching"
    )); // Verifique se existe o aviso de que o recurso já está sendo buscado  e transformo em booleano
    console.log("🚀 ~ app.get ~ isRefetching:", isRefetching);
    if (!isRefetching) {
      await redisClient.set("getAllProducts:isRefetching", "true", {
        expiration: { type: "EX", value: 20 },
      }); // Limito a 20 segundos a tentativa de atualizar a cache caso ao contrario tentar novamente
      // bloco de codigo que irá ficar em segundo plano para atualização do cache que está obsoleto
      setTimeout(async () => {
        console.log("🚀 Cache is stale - refetching...");
        const products = await getAllProducts();
        await redisClient.set("getAllProducts", JSON.stringify(products));
        await redisClient.set("getAllProducts:validation", "true", {
          expiration: { type: "EX", value: 5 },
        }); // Quem controla a validação da cache agora é a variavel getAllProducts:validation
        await redisClient.del("getAllProducts:isRefetching"); // Deleto o paremtro caso eu consiga realizar o refetch completo
      }, 0); // Função para exemplificar o background jobs para atualização do recurso na cache, ex: serviço de mensageria
    }
  }

  if (productsFromCache) {
    //caso ela exista
    const products = JSON.parse(productsFromCache);
    return res.send({ products }); // retorno todo o conteudo do meu cache evitando o tempo de busca pelo recurso na fonte
  }
  //caso não exista
  const products = await getAllProducts(); // busco o meu recurso na fonte
  await redisClient.set("getAllProducts", JSON.stringify(products));
  res.send({ products }); // retorno os produtos buscados na fonte
});

//rota para salvar um novo recurso somente para fins de estudo
app.get("/saved", async (_, res) => {
  await redisClient.del("getAllProducts");
  res.send({ ok: true });
});

const startup = async () => {
  await redisClient.connect(); //realizo a conexão com o redis
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
};

startup(); // iniciando o server
```

### Explicação do Código

1. **Configuração do Redis**:
   - O cliente Redis é criado com a biblioteca `redis`, configurado para conectar ao Redis em `redis://localhost:6379` com a senha `@a123456`.
   - A conexão é estabelecida com `redisClient.connect()`.

2. **Simulação de Operação Demorada**:
   - A função `getAllProducts` simula uma chamada a um recurso lento (como um banco de dados), com um tempo de resposta aleatório de até 10 segundos.
   - Retorna uma lista estática: `["Produto 1", "Produto 2", "Produto 3"]`.

3. **Lógica de Cache Stale-While-Revalidate**:
   - **Verificação do cache**: A rota `GET /` verifica se a chave `getAllProducts` existe no Redis.
   - **Controle de validade**: A chave `getAllProducts:validation` (com TTL de 5 segundos) determina se o cache está válido ou stale.
   - **Controle de concorrência**: A chave `getAllProducts:isRefetching` evita múltiplas atualizações simultâneas.
   - **Comportamento**:
     - Se o cache existe, retorna os dados imediatamente (mesmo que estejam stale).
     - Se o cache está stale (`getAllProducts:validation` expirou) e não há atualização em andamento (`isRefetching` não existe), uma tarefa em segundo plano (`setTimeout`) busca os dados da fonte, atualiza o cache e redefine a chave de validação.
     - Se o cache não existe, busca os dados da fonte diretamente.

4. **Rota de Limpeza de Cache**:
   - A rota `GET /saved` limpa a chave `getAllProducts`, permitindo testar o comportamento inicial.

---

## 📊 Cálculo de Tempo de Recurso

O cálculo a seguir, adaptado do estudo básico, ilustra o ganho de desempenho com o padrão **stale-while-revalidate**:

- **Cenário sem cache**:
  - 100 requisições por minuto, cada uma levando, em média, **5 a 10 segundos** (média de 7,5s).
  - Tempo total médio: **100 × 7,5s = 750 segundos** (~12,5 minutos).

- **Cenário com cache stale-while-revalidate**:
  - Apenas a **primeira requisição** (ou a primeira após o cache ficar stale e sem atualização em andamento) busca da fonte (~7,5 segundos).
  - Requisições subsequentes, mesmo com cache stale, retornam do Redis em tempo próximo a **0 segundos**.
  - Com um TTL de validação de **5 segundos**, suponha 12 janelas por minuto (60 ÷ 5). Na pior hipótese, uma requisição por janela busca da fonte, totalizando **12 × 7,5s = 90 segundos** para 100 requisições.
  - Na prática, como apenas uma tarefa atualiza o cache por vez, o tempo é ainda menor.

- **Ganho**:
  - **Sem cache**: 750 segundos.
  - **Com cache**: ~90 segundos (ou menos, devido ao controle de concorrência).
  - **Redução de tempo**: Aproximadamente **88%**, com respostas instantâneas mesmo em cache stale.

---

## 🛠 Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para o backend.
- **Express**: Framework para construção da API.
- **Redis**: Banco de dados em memória para caching.
- **Docker**: Para configurar o Redis de forma consistente.

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
   cd redis/avancado
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure o Redis com Docker**:
   - Use o arquivo `docker-compose.yml` para iniciar o Redis:
     ```bash
     docker-compose up -d
     ```
   - Conteúdo do `docker-compose.yml`:
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
   - Use o arquivo `client.http` com ferramentas como **VS Code com REST Client**:
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
     - Na primeira requisição, a resposta pode levar até **10 segundos**.
     - Requisições subsequentes, mesmo após o TTL de validação (5s), retornam instantaneamente do cache (stale ou não).
     - Use `/saved` para limpar o cache e testar o comportamento inicial.

---

## 📁 Estrutura do Projeto

```plaintext
└── redis
    └── avancado
        ├── README.md
        ├── client.http
        ├── package-lock.json
        ├── package.json
        └── server.js
```

---

## 📌 Conceitos Demonstrados

- **Stale-While-Revalidate**: Servir dados stale do cache enquanto uma atualização ocorre em segundo plano.
- **Controle de Concorrência**: Uso de `isRefetching` para evitar múltiplas atualizações simultâneas.
- **TTL Diferenciado**: Chave de validação (`getAllProducts:validation`) com TTL de 5 segundos, enquanto os dados permanecem no cache.
- **Cache em Memória**: Redis como camada de cache para respostas rápidas.
- **Testes Práticos**: Arquivo `client.http` para observar o impacto no tempo de resposta.
- **Docker**: Configuração consistente do Redis com `docker-compose.yml`.

---

## 🔍 Considerações Adicionais

- **Prevenção de Cache Stampede**: A chave `isRefetching` garante que apenas uma requisição atualize o cache, mesmo com múltiplos acessos simultâneos.
- **Escalabilidade**: A lógica pode ser integrada a sistemas de mensageria (ex: RabbitMQ) para atualizações em segundo plano mais robustas.
- **Flexibilidade do Redis**: Uso de múltiplas chaves (`validation`, `isRefetching`) para gerenciar o estado do cache.
- **Manutenção**: A rota `/saved` permite invalidar o cache manualmente.

Este repositório é uma base prática para entender o padrão **stale-while-revalidate** com Redis, oferecendo uma solução avançada para caching em aplicações Node.js.