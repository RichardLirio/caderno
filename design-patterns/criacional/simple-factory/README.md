# 📚 Design Patterns - Simple Factory Pattern

<div align="center">
  
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
  ![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
  ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
  
  ![Design Patterns](https://img.shields.io/badge/Design%20Patterns-Learning-blue?style=for-the-badge)
  ![SOLID Principles](https://img.shields.io/badge/SOLID-Principles-green?style=for-the-badge)
  ![Clean Code](https://img.shields.io/badge/Clean%20Code-Best%20Practices-orange?style=for-the-badge)

</div>

---

## 🎯 **Sobre o Projeto**

Este repositório demonstra a aplicação do **Simple Factory Pattern** no contexto de uma API NestJS.  
O objetivo é refatorar um código legado que possuía **condicionais encadeadas**, violava princípios do SOLID e dificultava a manutenção.

---

## 📋 **Cenário de Estudo**

### **Contexto da Aplicação**

A API possui um serviço de pedidos responsável por calcular o valor total de acordo com o tipo de produto:
- 📚 **Book** (livros)
- 💻 **Electronic** (eletrônicos)  
- 🍔 **Food** (alimentos)

O endpoint recebe o tipo de pedido e a quantidade e retorna o valor total calculado.

**Exemplo de requisição:**
```http
GET /orders/calculate?type=book&amount=3
```

---

## 🚨 **Problemas Identificados no Código Original**

### **❌ Código Problemático**
```typescript
@Injectable()
export class OrdersService {
  calculateOrder(type: string, amount: number) {
    let total = 0;

    if (type === 'book') {
      total = amount * 10;
      total += total * 0.1;
    } else if (type === 'electronic') {
      total = amount * 100;
      total += 50;
    } else if (type === 'food') {
      total = amount * 5;
      total += total * 0.05;
    } else {
      throw new Error(`Unknown order type: ${type}`);
    }

    return { type, amount, total };
  }
}
```

---

### **🔍 Problemas Encontrados**

| Problema | Descrição | Princípio Violado |
|----------|-----------|-------------------|
| **Múltiplas Responsabilidades** | Service responsável por regras de cálculo e decisão de tipo | SRP |
| **Código Não Extensível** | Adicionar novo tipo exige alterar o mesmo método | OCP |
| **Baixa Testabilidade** | Cálculos acoplados ao service dificultam testes isolados | Clean Code |
| **Alto Acoplamento** | `OrdersService` conhece detalhes de todas as regras | DIP |

---

## ✅ **Solução Implementada: Simple Factory Pattern**

### **🎯 Estratégia de Refatoração**

> **Regra de Ouro:** *Quando várias condições criam objetos diferentes baseados em um parâmetro, considere uma Factory para centralizar a criação.*

---

### **📐 Arquitetura da Solução**

#### **1. Interface do Contrato**
```typescript
export interface CalculateOrderTypeInterface {
  calculate(amount: number): number;
}
```

#### **2. Implementações Específicas**
```typescript
export class BookOrderCalculator implements CalculateOrderTypeInterface {
  calculate(amount: number): number {
    let total = amount * 10;
    total += total * 0.1;
    return total;
  }
}

export class ElectronicOrderCalculator implements CalculateOrderTypeInterface {
  calculate(amount: number): number {
    let total = amount * 100;
    total += 50;
    return total;
  }
}

export class FoodOrderCalculator implements CalculateOrderTypeInterface {
  calculate(amount: number): number {
    let total = amount * 5;
    total += total * 0.05;
    return total;
  }
}
```

#### **3. Factory para Criação**
```typescript
@Injectable()
export class OrdersFactory {
  constructor(
    private readonly bookOrderCalculator: BookOrderCalculator,
    private readonly electronicOrderCalculator: ElectronicOrderCalculator,
    private readonly foodOrderCalculator: FoodOrderCalculator,
  ) {}

  create(type: string): CalculateOrderTypeInterface {
    switch (type) {
      case 'book': return this.bookOrderCalculator;
      case 'electronic': return this.electronicOrderCalculator;
      case 'food': return this.foodOrderCalculator;
      default:
        throw new BadRequestException(`Unknown order type: ${type}`);
    }
  }
}
```

#### **4. Service Refatorado**
```typescript
@Injectable()
export class OrdersService {
  constructor(private readonly ordersFactory: OrdersFactory) {}

  calculateOrder(type: string, amount: number) {
    const calculator = this.ordersFactory.create(type);
    const total = calculator.calculate(amount);

    return { type, amount, total, message: "Calculation completed" };
  }
}
```

#### **5. Controller**
```typescript
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('calculate')
  calculateTotal(
    @Query('type') type: string,
    @Query('amount') amount: string,
  ) {
    return this.ordersService.calculateOrder(type, parseInt(amount, 10));
  }
}
```

---

## 🏆 **Benefícios Alcançados**

### **✅ Princípios SOLID Aplicados**

| Princípio | Antes | Depois |
|-----------|-------|--------|
| **Single Responsibility** | ❌ Service fazia tudo | ✅ Service delega para calculadores |
| **Open/Closed** | ❌ Necessário editar método para novos tipos | ✅ Novos tipos apenas adicionando nova classe |
| **Dependency Inversion** | ❌ Dependência de classes concretas | ✅ Dependência de abstração via interface |

---

### **🚀 Vantagens Técnicas**
- **📈 Extensibilidade:** Novos tipos de pedidos sem alterar código existente
- **🧪 Testabilidade:** Calculadores testáveis de forma isolada
- **🔧 Manutenibilidade:** Lógica centralizada na Factory
- **📖 Legibilidade:** Cada cálculo encapsulado em sua própria classe

---


## 🛠️ **Tecnologias Utilizadas**
- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset tipado do JavaScript
- **NestJS** - Framework modular para APIs
- **Design Patterns** - Padrões de projeto
- **SOLID Principles** - Princípios de design orientado a objetos

---

## 📚 **Referências**
- [Design Patterns: Elements of Reusable Object-Oriented Software](https://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612)
- [Clean Code: A Handbook of Agile Software Craftsmanship](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
- [Factory Pattern - Refactoring Guru](https://refactoring.guru/design-patterns/factory-method)
- [NestJS Docs](https://docs.nestjs.com/)

---

## 👨‍💻 **Autor**
**Richard Lirio**  
- GitHub: [@RichardLirio](https://github.com/RichardLirio)  
- LinkedIn: [Richard Lirio](https://www.linkedin.com/in/richard-silva-lirio-b97484250/)

Desenvolvido com 💜 durante meus estudos de Design Patterns e Clean Architecture.

---

<div align="center">

**⭐ Se este repositório te ajudou, deixe uma estrela!**

</div>
