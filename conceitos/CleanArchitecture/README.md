# 📘 Clean Architecture em JavaScript

Bem-vindo ao estudo de **Clean Architecture** em **JavaScript**, uma pasta dentro do meu **Caderno de Estudos**. Este repositório explora uma arquitetura que separa as preocupações do software em camadas concêntricas, promovendo flexibilidade, testabilidade e manutenção. Inspirado no trabalho de Robert C. Martin, o Clean Architecture organiza o código em camadas distintas, cada uma com responsabilidades específicas.

A ideia aqui é entender profundamente os conceitos de Clean Architecture, aplicá-los com exemplos práticos em JavaScript e visualizar as interações entre as camadas através de diagramas.

---

## 🎯 Objetivo

O objetivo é estruturar uma aplicação em camadas (entidades, casos de uso, interfaces e adaptadores), seguindo os princípios de Clean Architecture. Isso inclui definir regras claras de dependência entre camadas, demonstrar como elas interagem e fornecer exemplos funcionais que refletem uma aplicação bem organizada.

---

## 💡 O que é Clean Architecture?

Clean Architecture organiza o código em camadas concêntricas, onde a lógica de negócio está no centro e as camadas externas lidam com detalhes de implementação (como UI, banco de dados ou APIs). As camadas são:

1. **Entidades (Core)**: Regras de negócio centrais, independentes de frameworks ou tecnologias externas.
2. **Casos de Uso (Application)**: Lógica de aplicação que utiliza entidades e define o que a aplicação pode fazer.
3. **Interfaces (Interface Adapters)**: Camada que converte dados entre o mundo externo (ex: HTTP, CLI) e os casos de uso.
4. **Adaptadores (Frameworks & Drivers)**: Implementações específicas, como servidores HTTP, bancos de dados ou sistemas de arquivos.

### Regras de Dependência entre Camadas
- **Entidades** não dependem de nenhuma outra camada; são o núcleo da aplicação.
- **Casos de Uso** dependem apenas de **Entidades**.
- **Interfaces** dependem de **Casos de Uso** e podem depender de **Entidades** (indiretamente via casos de uso).
- **Adaptadores** dependem de **Interfaces** e podem interagir com o mundo externo (ex: HTTP, DB).
- **Nenhuma camada interna (Entidades ou Casos de Uso)** deve depender de camadas externas (Interfaces ou Adaptadores)**. Isso é alcançado usando injeção de dependências e abstrações.

---

## 📊 Visualização das Camadas

### Fluxo de Requisição (Diagrama Textual)
Imagine um diagrama circular com camadas concêntricas. Aqui está uma representação textual que você pode usar para criar um gráfico:

```
+------------------------+
| Adaptadores/Controllers|
| (HTTP, DB, UI)         |
|  -> Converte           |
|     requisições        |
|     para Interfaces    |
+------------------------+
        ↓
+---------------------+
| Interfaces          |
|  -> Chama Casos     |
|     de Uso          |
+---------------------+
        ↓
+---------------------+
| Casos de Uso        |
|  -> Utiliza         |
|     Entidades       |
+---------------------+
        ↓
+---------------------+
| Entidades           |
| (Regras de Negócio) |
+---------------------+
```

- **Descrição**: A requisição começa nos Adaptadores (ex: um endpoint HTTP), passa pelas Interfaces (conversão de dados), chega aos Casos de Uso (lógica de negócio) e interage com as Entidades (regras centrais). O fluxo de retorno segue o caminho inverso.

### Fluxo de Dependência (Diagrama Textual)
Outro diagrama mostra as dependências (setas apontam para a direção da dependência):

```
Entidades ← Casos de Uso ← Interfaces ← Adaptadores
  (Nenhuma    (Depende    (Depende    (Depende
   dependência) de Entidades) de Casos  de Interfaces
                            de Uso)    e mundo externo)
```

- **Descrição**: As setas indicam que as camadas externas dependem das internas, mas as internas não dependem das externas, seguindo o princípio de inversão de dependência.

---

## 🚀 Exemplos Práticos

### Exemplo: Sistema de Usuários

#### Entidade
```javascript
class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  validateName() {
    if (!this.name || this.name.length < 2) throw new Error("Nome inválido");
  }
}
```

#### Caso de Uso
```javascript
class CreateUserUseCase {
  constructor(userRepo) {
    this.userRepo = userRepo; // Injeção de dependência
  }

  execute(name) {
    const user = new User(Date.now(), name);
    user.validateName();
    this.userRepo.save(user);
    return user;
  }
}
```

#### Interface
```javascript
class UserRepository {
  save(user) {}
  findById(id) {}
}
```

#### Adaptador (Exemplo com Memória e HTTP)
```javascript
// Repositório em Memória
class InMemoryUserRepository {
  constructor() {
    this.users = new Map();
  }

  save(user) {
    this.users.set(user.id, user);
  }

  findById(id) {
    return this.users.get(id);
  }
}

// Adaptador HTTP
const express = require("express");
const app = express();

app.use(express.json());

app.post("/users", (req, res) => {
  const useCase = new CreateUserUseCase(new InMemoryUserRepository());
  const user = useCase.execute(req.body.name);
  res.json(user);
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
```

---

## 📌 Conceitos Demonstrados

- Separação em camadas (Entidades, Casos de Uso, Interfaces, Adaptadores).
- Dependência de abstrações em vez de implementações.
- Injeção de dependências para desacoplamento.
- Fluxo de requisições e dependências entre camadas.

---

## 🔍 Considerações Adicionais

- **Testabilidade**: Camadas internas (Entidades, Casos de Uso) podem ser testadas sem dependências externas.
- **Flexibilidade**: Adaptadores podem ser trocados (ex: de MySQL para MongoDB) sem alterar a lógica de negócio.
- **Escalabilidade**: Combine com DDD e TDD para uma arquitetura robusta.