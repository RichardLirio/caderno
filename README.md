# 📘 Caderno de Estudos

Bem-vindo ao **Caderno**, um repositório pessoal de anotações, conceitos e exemplos práticos sobre tecnologias que estou estudando.

A ideia aqui é centralizar o conhecimento de forma organizada e acessível, com conteúdos simples, diretos e sempre acompanhados de exemplos funcionais.

---

## 📚 Índice de Tópicos

- [Node.js](#nodejs)
  - [Iniciando um projeto Node.js com Express e TypeScript](./nodejs/express-typescript-boilerplate)
  - [Iniciando um projeto Node.js com Fastify e TypeScript](./nodejs/fastify-typescript-boilerplate)
  - [Idempotência em APIs HTTP com Node.js e Redis](./idempotencia)
  - [Cache com Redis em Node.js](./redis)
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

### 🗄 Cache com Redis em Node.js Modelo básico

> Caminho: [`/redis-basic`](./redis/basico)

Este exemplo básico explora o uso de **Redis** como um sistema de cache em memória integrado a uma aplicação Node.js com **Express**. A implementação demonstra como armazenar resultados de operações demoradas (como chamadas a banco de dados) em cache, reduzindo significativamente o tempo de resposta das requisições. Inclui testes práticos com um arquivo `client.http` para observar o impacto do cache no desempenho.