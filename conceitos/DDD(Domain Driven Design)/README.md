# 📘 DDD (Domain-Driven Design) em JavaScript

Bem-vindo ao estudo de **Domain-Driven Design (DDD)** em **JavaScript**, uma pasta dentro do meu **Caderno de Estudos**. Este repositório explora como modelar software com base no domínio do problema, usando uma abordagem prática e orientada a objetos.

A ideia aqui é entender os conceitos centrais do DDD e aplicá-los com exemplos funcionais em JavaScript.

---

## 🎯 Objetivo

O objetivo é aprender a estruturar aplicações complexas usando DDD, focando em entidades, agregados, value objects e casos de uso, com exemplos práticos que refletem o domínio do negócio.

---

## 💡 O que é DDD?

DDD é uma abordagem que prioriza o domínio do problema no desenvolvimento de software. Seus conceitos principais incluem:

- **Entidades**: Objetos com identidade única.
- **Value Objects**: Objetos definidos por seus atributos, sem identidade.
- **Agregados**: Grupos de entidades e value objects tratados como uma unidade.
- **Casos de Uso**: Lógica de negócios aplicada ao domínio.

---

## 🚀 Exemplos Práticos

### Exemplo: Sistema de Pedidos

#### Entidade
```javascript
class Order {
  constructor(id, items) {
    this.id = id;
    this.items = items;
    this.status = "pending";
  }

  addItem(item) {
    this.items.push(item);
  }
}

const order = new Order(1, []);
order.addItem({ name: "Produto A", price: 10 });
console.log(order);
```

#### Value Object
```javascript
class Money {
  constructor(amount, currency) {
    this.amount = amount;
    this.currency = currency;
  }

  equals(other) {
    return this.amount === other.amount && this.currency === other.currency;
  }
}

const price = new Money(10, "BRL");
const samePrice = new Money(10, "BRL");
console.log(price.equals(samePrice)); // true
```

#### Agregado
```javascript
class OrderAggregate {
  constructor(order, customer) {
    this.order = order;
    this.customer = customer;
  }

  validate() {
    if (!this.customer) throw new Error("Cliente necessário");
    return true;
  }
}

const customer = { id: 1, name: "João" };
const aggregate = new OrderAggregate(order, customer);
aggregate.validate();
```

#### Caso de Uso
```javascript
class CreateOrderUseCase {
  execute(orderData) {
    const order = new Order(orderData.id, orderData.items);
    const aggregate = new OrderAggregate(order, orderData.customer);
    aggregate.validate();
    console.log("Pedido criado:", order);
    return order;
  }
}

const useCase = new CreateOrderUseCase();
useCase.execute({ id: 1, items: [], customer });
```
---

## 📌 Conceitos Demonstrados

- Modelagem de domínio com entidades e value objects.
- Uso de agregados para consistência.
- Implementação de casos de uso baseados no domínio.

---

## 🔍 Considerações Adicionais

- DDD é ideal para projetos complexos onde o domínio é o foco principal.
- Combine com outras práticas como TDD para maior robustez.