# 📘 TDD (Test-Driven Development) em JavaScript

Bem-vindo ao estudo de **Test-Driven Development (TDD)** em **JavaScript**, uma pasta dentro do meu **Caderno de Estudos**. Este repositório explora a prática de desenvolver código guiado por testes, promovendo qualidade e confiabilidade.

A ideia aqui é entender o ciclo TDD (Red-Green-Refactor) e aplicá-lo com exemplos práticos em JavaScript.

---

## 🎯 Objetivo

O objetivo é aprender a escrever testes antes do código, seguindo o ciclo TDD, e refatorar para manter um código limpo e funcional.

---

## 💡 O que é TDD?

TDD é uma metodologia onde:
1. **Red**: Escreve um teste que falha (porque o código ainda não existe).
2. **Green**: Implementa o código mínimo para fazer o teste passar.
3. **Refactor**: Melhora o código sem alterar seu comportamento.

---

## 🚀 Exemplos Práticos

### Exemplo: Calculadora Simples

#### Passo 1: Red (Teste que falha)
```javascript
const assert = require("assert");

function add(a, b) {
  return 0; // Placeholder
}

assert.strictEqual(add(2, 3), 5); // Falha inicialmente
```

#### Passo 2: Green (Código para passar o teste)
```javascript
function add(a, b) {
  return a + b;
}

assert.strictEqual(add(2, 3), 5); // Passa
```

#### Passo 3: Refactor (Otimização)
```javascript
function add(a, b) {
  if (typeof a !== "number" || typeof b !== "number") throw new Error("Invalid input");
  return a + b;
}

assert.strictEqual(add(2, 3), 5); // Passa
assert.throws(() => add("2", 3), Error); // Teste de validação
```

---

## 📌 Conceitos Demonstrados

- Ciclo Red-Green-Refactor do TDD.
- Escrita de testes antes da implementação.
- Refatoração para adicionar robustez.

---

## 🔍 Considerações Adicionais

- TDD melhora a cobertura de testes e facilita a manutenção.
- Use com ferramentas como Vitest para projetos maiores.