# 📘 SOLID em JavaScript

Bem-vindo ao estudo do princípio **SOLID** em **JavaScript**, uma pasta dentro do meu **Caderno de Estudos**. Este repositório explora os cinco princípios de design orientado a objetos que tornam o código mais manutenível, escalável e robusto.

A ideia aqui é entender cada princípio de forma prática, com exemplos funcionais que demonstram sua aplicação em JavaScript.

---

## 🎯 Objetivo

O objetivo é aplicar os princípios SOLID (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion) em projetos JavaScript, melhorando a estrutura e a reutilização do código.

---

## 💡 O que é SOLID?

SOLID é um acrônimo para cinco princípios que guiam o desenvolvimento orientado a objetos:

1. **Single Responsibility Principle (SRP)**: Uma classe deve ter apenas uma razão para mudar, ou seja, uma única responsabilidade.
2. **Open/Closed Principle (OCP)**: Classes devem estar abertas para extensão, mas fechadas para modificação.
3. **Liskov Substitution Principle (LSP)**: Objetos de uma superclasse devem ser substituíveis por objetos de subclasses sem afetar o comportamento.
4. **Interface Segregation Principle (ISP)**: Muitas interfaces específicas são melhores do que uma interface geral.
5. **Dependency Inversion Principle (DIP)**: Dependa de abstrações, não de implementações concretas.

---

## 🚀 Exemplos Práticos

### 1. Single Responsibility Principle (SRP)
Uma classe deve fazer apenas uma coisa.

```javascript
// Sem SRP: Classe fazendo várias coisas
class UserManager {
  saveUser(user) {
    // Lógica de salvamento
    console.log(`Salvando ${user.name}`);
  }
  sendEmail(user) {
    // Lógica de envio de email
    console.log(`Enviando email para ${user.name}`);
  }
}

// Com SRP: Separação de responsabilidades
class UserSaver {
  saveUser(user) {
    console.log(`Salvando ${user.name}`);
  }
}

class EmailSender {
  sendEmail(user) {
    console.log(`Enviando email para ${user.name}`);
  }
}

const user = { name: "João" };
const saver = new UserSaver();
const sender = new EmailSender();
saver.saveUser(user);
sender.sendEmail(user);
```

### 2. Open/Closed Principle (OCP)
Adicione nova funcionalidade estendendo a classe, sem modificá-la.

```javascript
class Animal {
  makeSound() {
    throw new Error("Método deve ser sobrescrito");
  }
}

class Dog extends Animal {
  makeSound() {
    return "Au au!";
  }
}

class Cat extends Animal {
  makeSound() {
    return "Miau!";
  }
}

const animals = [new Dog(), new Cat()];
animals.forEach(animal => console.log(animal.makeSound()));
```

### 3. Liskov Substitution Principle (LSP)
Subclasses devem ser substituíveis pelas suas superclasses.

```javascript
class Bird {
  fly() {
    return "Voando...";
  }
}

class Sparrow extends Bird {
  fly() {
    return "Pássaro voando baixo.";
  }
}

// Pinguim não voa, mas ainda é um Bird
class Penguin extends Bird {
  fly() {
    throw new Error("Pinguins não voam!");
  }
}

function makeBirdFly(bird) {
  try {
    console.log(bird.fly());
  } catch (e) {
    console.log(e.message);
  }
}

makeBirdFly(new Sparrow()); // "Pássaro voando baixo."
makeBirdFly(new Penguin()); // "Pinguins não voam!"
```

### 4. Interface Segregation Principle (ISP)
Evite interfaces grandes; crie interfaces menores e específicas.

```javascript
// Sem ISP: Interface grande
class Worker {
  work() {}
  eat() {}
}

class Robot {
  work() {
    console.log("Robot working...");
  }
  eat() {
    throw new Error("Robots don't eat!");
  }
}

// Com ISP: Interfaces separadas
class Workable {
  work() {}
}

class Eatable {
  eat() {}
}

class Human implements Workable, Eatable {
  work() { console.log("Human working..."); }
  eat() { console.log("Human eating..."); }
}

class Robot implements Workable {
  work() { console.log("Robot working..."); }
}
```

### 5. Dependency Inversion Principle (DIP)
Dependa de abstrações, não de implementações.

```javascript
// Sem DIP: Dependência direta
class MySQLDatabase {
  save(data) {
    console.log(`Salvando ${data} no MySQL`);
  }
}

class UserService {
  constructor() {
    this.db = new MySQLDatabase();
  }
  saveUser(data) {
    this.db.save(data);
  }
}

// Com DIP: Abstração
class Database {
  save(data) {}
}

class MySQLDatabase implements Database {
  save(data) {
    console.log(`Salvando ${data} no MySQL`);
  }
}

class UserService {
  constructor(db) {
    this.db = db;
  }
  saveUser(data) {
    this.db.save(data);
  }
}

const db = new MySQLDatabase();
const service = new UserService(db);
service.saveUser("user1");
```
---

## 📌 Conceitos Demonstrados

- Aplicação prática dos cinco princípios SOLID.
- Estruturação de código limpo e modular.
- Exemplos de refatoração para melhor aderência aos princípios.

---

## 🔍 Considerações Adicionais

- Esses princípios ajudam a evitar acoplamento excessivo e facilitam a manutenção.
- Aplique-os em projetos maiores para escalabilidade.