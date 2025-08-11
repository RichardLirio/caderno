# 📘 Caderno de Estudos

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2022+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-7.0+-DC382D?style=for-the-badge&logo=redis&logoColor=white)

![Design Patterns](https://img.shields.io/badge/Design%20Patterns-Learning-blue?style=flat-square)
![SOLID Principles](https://img.shields.io/badge/SOLID-Principles-green?style=flat-square)
![Clean Code](https://img.shields.io/badge/Clean%20Code-Best%20Practices-orange?style=flat-square)
![License](https://img.shields.io/github/license/RichardLirio/caderno?style=flat-square)
![Last Commit](https://img.shields.io/github/last-commit/RichardLirio/caderno?style=flat-square)
![Repo Size](https://img.shields.io/github/repo-size/RichardLirio/caderno?style=flat-square)
![Stars](https://img.shields.io/github/stars/RichardLirio/caderno?style=flat-square)

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
- [Design Patterns](./design-patterns)
  - [Strategy Pattern - Sistema de Cálculo de Impostos](./design-patterns/strategy-pattern)
- [Algoritmos](./algoritmos)
  - [Busca Binária (Binary Search)](./algoritmos/busca_binaria)
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

## 🎨 Design Patterns

### 📋 Strategy Pattern - Sistema de Cálculo de Impostos

> Caminho: [`/design-patterns/strategy-pattern`](./design-patterns/comportamental/strategy)

Este exemplo demonstra a aplicação do **Strategy Pattern** em uma API financeira para cálculo de impostos. Aborda a refatoração de um código que violava princípios SOLID, transformando comparações com strings em classes bem definidas. Inclui análise detalhada dos problemas (Single Responsibility e Open/Closed Principle), implementação da solução com TypeScript e NestJS, e demonstração dos benefícios alcançados. Serve como base para estudos sobre Factory Pattern, que resolverá a lógica de instanciação no controller.

---

### 🏭 Simple Factory Pattern - Sistema de Cálculo de Pedidos

> Caminho: [`/design-patterns/simple-factory-pattern`](./design-patterns/criacional/simple-factory)

Este exemplo aplica o **Simple Factory Pattern** para melhorar a manutenção e extensibilidade de um sistema de cálculo de pedidos em uma API NestJS.  
O código legado instanciava calculadoras diretamente no service, utilizando condicionais repetitivas (`if/else`), dificultando a adição de novos tipos de pedido.  
A refatoração introduz uma **fábrica simples** responsável por fornecer a implementação correta de acordo com o tipo de pedido, permitindo:
- Remover dependências diretas do service sobre classes concretas.
- Facilitar a adição de novos cálculos sem modificar código existente.
- Integrar o padrão com o ciclo de injeção de dependências do NestJS.

Inclui:
- Contrato (`CalculateOrderTypeInterface`) para padronizar calculadoras.
- Calculadoras específicas (`BookOrderCalculator`, `ElectronicOrderCalculator`, `FoodOrderCalculator`).
- Factory (`OrdersFactory`) com integração ao NestJS.
- Controller e Service ajustados para consumir a factory.

Serve como base para estudo de padrões de criação e para evoluir posteriormente para **Factory Method** ou **Abstract Factory**.

---

## 🔢 Algoritmos

### 🎯 Busca Binária (Binary Search)

> Caminho: [`/algoritmos/busca_binaria`](./algoritmos/busca_binaria)

Este exemplo implementa e explora o algoritmo de **busca binária** em JavaScript/TypeScript. Demonstra como realizar buscas eficientes (O(log n)) em listas ordenadas, incluindo implementações para números e strings. Contém análises importantes sobre as peculiaridades do método `sort()` do JavaScript, como os problemas com ordenação de números e strings, e as soluções corretas usando funções de comparação e `localeCompare()`. Inclui casos de uso práticos, considerações de performance e aprendizados sobre quando usar ou não este algoritmo.

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

---

## 🤝 Contribuindo

Este é um repositório pessoal de estudos, mas sugestões e correções são sempre bem-vindas! 

Se você encontrou algum erro ou tem uma sugestão de melhoria:
1. Abra uma **issue** descrevendo o problema ou sugestão
2. Faça um **fork** do repositório
3. Crie uma **branch** para sua contribuição
4. Envie um **pull request**

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 📧 Contato

**Richard Lirio**
- GitHub: [@RichardLirio](https://github.com/RichardLirio)
- LinkedIn: [Richard Lirio](https://www.linkedin.com/in/richard-silva-lirio-b97484250/)

---

*💡 "O conhecimento é a única coisa que cresce quando é compartilhado"*