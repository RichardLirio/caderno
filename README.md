# 📘 Caderno de Estudos

Bem-vindo ao **Caderno**, um repositório pessoal de anotações, conceitos e exemplos práticos sobre tecnologias que estou estudando.

A ideia aqui é centralizar o conhecimento de forma organizada e acessível, com conteúdos simples, diretos e sempre acompanhados de exemplos funcionais.

---

## 📚 Índice de Tópicos

- [Node.js](./nodejs)
  - [Iniciando um projeto Node.js com Express e TypeScript](./nodejs/express-typescript-boilerplate)
  - [Iniciando um projeto Node.js com Fastify e TypeScript](./nodejs/fastify-typescript-boilerplate)
  - [Idempotência em APIs HTTP com Node.js e Redis](./idempotencia)
  - [Cache com Redis em Node.js - Básico](./redis/basico)
  - [Cache com Redis em Node.js - Avançado (Stale-While-Revalidate)](./redis/avancado)
  - [Streams em Node.js - Fundamentos](./nodejs/fundamentos/streams)
- [Conceitos Avançados](./conceitos)
  - [SOLID em JavaScript](./conceitos/SOLID)
  - [DDD (Domain-Driven Design) em JavaScript](./conceitos/DDD(Domain%20Driven%20Design))
  - [TDD (Test-Driven Development) em JavaScript](./conceitos/TDD(Test%20Driven%20Development))
  - [Clean Architecture em JavaScript](./conceitos/CleanArchitecture)

---

## 🟢 Node.js

### 📦 Iniciando um projeto Node.js com Express e TypeScript

> Caminho: [`/nodejs/express-typescript-boilerplate`](./nodejs/express-typescript-boilerplate)

Este exemplo mostra como criar um projeto Node.js moderno utilizando **Express** e **TypeScript**, ideal para iniciar uma API com boa estrutura desde o início.

### ⚡ Iniciando um projeto Node.js com Fastify e TypeScript

> Caminho: [`/nodejs/fastify-typescript-boilerplate`](./nodejs/fastify-typescript-boilerplate)

Esse exemplo mostra como criar uma API utilizando **Fastify** com **TypeScript**, com configuração mínima e moderna.

### 🔁 Idempotência em APIs HTTP com Node.js e Redis

> Caminho: [`/idempotencia`](./idempotencia)

Este exemplo demonstra o conceito de idempotência em APIs HTTP, utilizando **Node.js**, **Fastify**, e **Redis**. Inclui uma implementação prática de uma rota de checkout que garante que requisições repetidas produzam o mesmo resultado sem efeitos colaterais, como em cenários de processamento de pagamentos.

### 🗄 Cache com Redis em Node.js - Básico

> Caminho: [`/redis/basico`](./redis/basico)

Este exemplo básico explora o uso de **Redis** como um sistema de cache em memória integrado a uma aplicação Node.js com **Express**. A implementação demonstra como armazenar resultados de operações demoradas (como chamadas a banco de dados) em cache, reduzindo significativamente o tempo de resposta das requisições. Inclui testes práticos com um arquivo `client.http` para observar o impacto do cache no desempenho.

### 🗄 Cache com Redis em Node.js - Avançado (Stale-While-Revalidate)

> Caminho: [`/redis/avancado`](./redis/avancado)

Este exemplo avançado explora o padrão **stale-while-revalidate** para caching com **Redis** em uma aplicação Node.js com **Express**. A implementação utiliza chaves adicionais no Redis para gerenciar o estado do cache (válido, desatualizado ou em atualização), evitando sobrecarga na fonte de dados e garantindo respostas rápidas mesmo com dados stale. Inclui testes práticos com um arquivo `client.http` para observar a eficiência do padrão.

### 🌊 Streams em Node.js - Fundamentos

> Caminho: [`/nodejs/fundamentos/streams`](./nodejs/fundamentos/streams)

Este exemplo introduz os fundamentos de **Streams** em Node.js, abordando **Readable Streams**, **Transform Streams**, e **Writable Streams**. Demonstra como processar grandes volumes de dados (como arquivos de 2 GB) em pedaços (chunks), evitando travamentos. Inclui exemplos práticos como geração de arquivos CSV e uso de pipelines, além de analogias para facilitar o entendimento do conceito.

---

## 🧠 Conceitos Avançados

### 📐 SOLID em JavaScript

> Caminho: [`/conceitos/SOLID`](./conceitos/SOLID)

Este exemplo explora os cinco princípios SOLID (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion) em JavaScript. Inclui exemplos práticos que demonstram como aplicar cada princípio para criar código modular, manutenível e escalável.

### 🌐 DDD (Domain-Driven Design) em JavaScript

> Caminho: [`/conceitos/DDD(Domain Driven Design)`](./conceitos/DDD(Domain%20Driven%20Design))

Este exemplo introduz o **Domain-Driven Design**, focando na modelagem de software baseada no domínio do problema. Apresenta conceitos como entidades, value objects, agregados e casos de uso, com exemplos práticos que refletem a lógica de negócio em JavaScript.

### ✅ TDD (Test-Driven Development) em JavaScript

> Caminho: [`/conceitos/TDD(Test Driven Development)`](./conceitos/TDD(Test%20Driven%20Development))

Este exemplo aborda o **Test-Driven Development**, seguindo o ciclo Red-Green-Refactor. Inclui exemplos práticos que mostram como escrever testes antes do código, garantindo qualidade e facilitando a refatoração em projetos JavaScript.

### 🏛 Clean Architecture em JavaScript

> Caminho: [`/conceitos/CleanArchitecture`](./conceitos/CleanArchitecture)

Este exemplo aprofunda a **Clean Architecture**, organizando o código em camadas concêntricas (Entidades, Casos de Uso, Interfaces e Adaptadores). Demonstra como separar as preocupações do software, com regras de dependência (Entidades → Casos de Uso → Interfaces → Adaptadores) e exemplos práticos, incluindo um servidor HTTP.