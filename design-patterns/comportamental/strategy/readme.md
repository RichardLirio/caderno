# 📚 Design Patterns - Strategy Patterns

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

Este repositório documenta minha jornada de aprendizado sobre **Design Patterns** e **Princípios SOLID** aplicados em desenvolvimento de APIs. O foco principal é demonstrar como refatorar código utilizando boas práticas de programação e padrões de design para criar soluções mais robustas e maintíveis.

---

## 📋 **Cenário de Estudo**

### **Contexto da Aplicação**

A API desenvolvida é um serviço de um sistema financeiro responsável por calcular impostos para:
- 👨‍💼 Empresários
- 🚀 Empreendedores  
- 🛍️ Vendedores
- 💼 Outros profissionais autônomos

### **Funcionalidade Principal**

O endpoint recebe o valor faturado e o tipo de imposto, realiza o cálculo correspondente e retorna o valor a ser pago ao governo.

**Exemplo de requisição:**
```json
{
  "taxType": "ISS",
  "amount": 10000
}
```

---

## 🚨 **Problemas Identificados no Código Original**

### **❌ Código Problemático**

```typescript
@Injectable()
export class TaxService {
  calculate(taxType: string, amount: number): number {
    if (taxType === "ICMS") {
      return (amount * 4) / 100;
    }
    if (taxType === "ISS") {
      return (amount * 11) / 100;
    }
    if (taxType === "IPI") {
      return (amount * 15) / 100;
    }
    throw new BadRequestException("invalid tax type.");
  }
}
```

### **🔍 Problemas Encontrados:**

| Problema | Descrição | Princípio Violado |
|----------|-----------|-------------------|
| **Múltiplas Responsabilidades** | Classe responsável por conhecer todos os tipos de impostos e seus cálculos | Single Responsibility Principle |
| **Código Não Extensível** | Para adicionar novo imposto, é necessário modificar a classe existente | Open/Closed Principle |
| **Obsessão por Tipos Primitivos** | Uso de strings para representar contextos de negócio | Clean Code Principles |

---

## ✅ **Solução Implementada: Strategy Pattern**

### **🎯 Estratégia de Refatoração**

> **Regra de Ouro:** *Sempre que houver uma comparação com uma string que represente um "tipo" de algo no sistema, esta string deve se transformar em uma classe!*

### **📐 Arquitetura da Solução**

#### **1. Interface do Contrato**
```typescript
interface TaxTypeInterface {
  calculate(amount: number): number;
}
```

#### **2. Implementações Específicas**
```typescript
export class ICMS implements TaxTypeInterface {
  calculate(amount: number): number {
    return (amount * 4) / 100;
  }
}

export class ISS implements TaxTypeInterface {
  calculate(amount: number): number {
    return (amount * 11) / 100;
  }
}

export class IPI implements TaxTypeInterface {
  calculate(amount: number): number {
    return (amount * 15) / 100;
  }
}
```

#### **3. Service Refatorado**
```typescript
@Injectable()
export class TaxService {
  private taxType: TaxTypeInterface;

  calculate(amount: number): number {
    return this.taxType.calculate(amount);
  }

  setTaxType(taxType: TaxTypeInterface): void {
    this.taxType = taxType;
  }
}
```

#### **4. Controller Atualizado**
```typescript
@Controller("calculate")
export class TaxController {
  constructor(private readonly appService: TaxService) {}

  @Post()
  calculateTax(@Body() body: { taxType: string; amount: number }) {
    const { taxType, amount } = body;
    let taxTypeInterface: TaxTypeInterface;

    // ⚠️ Regra de negócio que será resolvida com Factory Pattern
    switch (taxType) {
      case "ISS":
        taxTypeInterface = new ISS();
        break;
      case "ICMS":
        taxTypeInterface = new ICMS();
        break;
      case "IPI":
        taxTypeInterface = new IPI();
        break;
      default:
        throw new BadRequestException("Invalid tax type");
    }

    this.appService.setTaxType(taxTypeInterface);
    const tax = this.appService.calculate(amount);

    return { tax };
  }
}
```

---

## 🏆 **Benefícios Alcançados**

### **✅ Princípios SOLID Aplicados**

| Princípio | Antes | Depois |
|-----------|-------|--------|
| **Single Responsibility** | ❌ Service conhecia todos os impostos | ✅ Cada classe tem uma responsabilidade |
| **Open/Closed** | ❌ Modificação necessária para novos impostos | ✅ Extensível sem modificação |
| **Liskov Substitution** | ❌ Não aplicável | ✅ Substituição transparente via interface |
| **Interface Segregation** | ❌ Não aplicável | ✅ Interface específica e coesa |
| **Dependency Inversion** | ❌ Dependência de implementações concretas | ✅ Dependência de abstração |

### **🚀 Vantagens Técnicas**

- **🔧 Manutenibilidade:** Cada imposto em classe separada
- **📈 Extensibilidade:** Novos impostos sem modificar código existente  
- **🧪 Testabilidade:** Classes isoladas facilitam testes unitários
- **📖 Legibilidade:** Código mais claro e autodocumentado
- **🔄 Reutilização:** Classes de impostos podem ser reutilizadas

---

## 🔮 **Próximos Passos**

### **🏭 Factory Pattern**
> **Objetivo:** Remover a lógica de instanciação do controller, aplicando o padrão Factory para criação de objetos.

**Problema a resolver:**
- Regras de negócio no controller (violação de boas práticas)
- Switch/case acoplado à lógica de apresentação

---

## 🛠️ **Tecnologias Utilizadas**

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset tipado do JavaScript  
- **NestJS** - Framework para APIs escaláveis
- **Design Patterns** - Padrões de projeto
- **SOLID Principles** - Princípios de design orientado a objetos

---

## 📚 **Referências de Estudo**

- [Design Patterns: Elements of Reusable Object-Oriented Software](https://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612)
- [Clean Code: A Handbook of Agile Software Craftsmanship](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
- [SOLID Principles](https://www.digitalocean.com/community/conceptual_articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design)
- [Padrão de Projeto Strategy: Tudo o Que Você Precisa Saber Sobre Esse Design Pattern (GOF) - Renato Augusto](https://youtu.be/DzlXwgsc_AU?si=fkdmm-nP3zuuRI3G)
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