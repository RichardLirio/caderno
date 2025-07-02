# Busca Binária (Binary Search)

Este repositório contém implementações e estudos sobre o algoritmo de busca binária em JavaScript/TypeScript, incluindo análises importantes sobre o método `sort()` e suas peculiaridades.

## O que é Busca Binária?

A busca binária é um algoritmo de busca eficiente que funciona dividindo repetidamente pela metade uma lista ordenada até encontrar o elemento desejado. É uma aplicação clássica da estratégia "dividir para conquistar".

### Como Funciona

1. **Pré-requisito**: A lista deve estar ordenada
2. **Processo**: 
   - Compara o elemento do meio da lista com o valor procurado
   - Se for igual, encontrou o elemento
   - Se o elemento do meio for maior, busca na metade inferior
   - Se o elemento do meio for menor, busca na metade superior
   - Repete até encontrar ou esgotar as possibilidades

## Complexidade

- **Tempo**: O(log n) - muito mais eficiente que busca linear O(n)
- **Espaço**: O(1) - versão iterativa

## Implementações

### Busca Binária para Números

```typescript
function pesquisa_binaria(lista: number[], item: number) {
  let baixo = 0;
  let alto = lista.length - 1;
  let meio = 0;
  let chute = 0;

  // Ordenação correta para números
  let listaOrdenada = lista.sort((a: number, b: number) => {
    return a - b;
  });

  while (baixo <= alto) {
    meio = Math.round((baixo + alto) / 2);
    chute = listaOrdenada[meio];

    if (chute === item) {
      return meio;
    }
    if (chute > item) {
      alto = meio - 1;
    } else {
      baixo = meio + 1;
    }
  }
  return null;
}
```

### Busca Binária para Strings

```typescript
function pesquisa_binaria_palavras(lista: string[], palavra: string) {
  let baixo = 0;
  let alto = lista.length - 1;
  let meio;
  let chute;

  // Ordenação correta para strings usando localeCompare
  let listaOrdenada = lista.sort((a: string, b: string) => {
    return a.localeCompare(b);
  });

  while (baixo <= alto) {
    meio = Math.round((baixo + alto) / 2);
    chute = listaOrdenada[meio];

    if (chute === palavra) {
      return meio;
    }
    if (chute.localeCompare(palavra) === 1) {
      alto = meio - 1;
    } else {
      baixo = meio + 1;
    }
  }
  return null;
}
```

## ⚠️ Cuidados Importantes com o Método `sort()`

### Problema com Números

O método `sort()` do JavaScript, por padrão, converte elementos para string e os compara baseado nos valores UTF-16. Isso causa problemas com números:

```javascript
// ❌ ERRADO - Comportamento inesperado
[10, 2, 1, 20].sort() // Resultado: [1, 10, 2, 20]

// ✅ CORRETO - Função de comparação numérica
[10, 2, 1, 20].sort((a, b) => a - b) // Resultado: [1, 2, 10, 20]
```

### Problema com Strings e Caracteres Especiais

Para strings, especialmente com acentos e caracteres especiais, use `localeCompare()`:

```javascript
// ❌ ERRADO - Pode não considerar acentos corretamente
["ção", "casa", "árvore"].sort()

// ✅ CORRETO - Considera localização e acentos
["ção", "casa", "árvore"].sort((a, b) => a.localeCompare(b))
```

## Casos de Uso

### Quando Usar Busca Binária

1. **Listas grandes e ordenadas**: Onde a eficiência é crucial
2. **Busca em arrays de números**: IDs, valores ordenados
3. **Busca em dicionários**: Palavras em ordem alfabética
4. **Busca de intervalos**: Encontrar posição de inserção
5. **Sistemas de cache**: Busca rápida em dados indexados

### Quando NÃO Usar

1. **Listas pequenas**: Overhead pode não compensar (< 100 elementos)
2. **Listas não ordenadas**: Custo de ordenação pode ser maior que busca linear
3. **Inserções/remoções frequentes**: Manter ordem fica custoso
4. **Busca por múltiplos critérios**: Outros algoritmos podem ser melhores

## Exemplos Práticos

### Busca em Lista de IDs
```typescript
const ids = [1, 15, 23, 45, 67, 89, 123, 456];
const resultado = pesquisa_binaria(ids, 67); // Retorna índice 4
```

### Busca em Lista de Nomes
```typescript
const nomes = ["Ana", "Bruno", "Carlos", "Diana"];
const resultado = pesquisa_binaria_palavras(nomes, "Carlos"); // Retorna índice
```

## Aprendizados Principais

### Sobre o Algoritmo
- A busca binária é extremamente eficiente para grandes datasets
- Requer lista ordenada como pré-requisito absoluto
- Implementação iterativa é mais eficiente em espaço que recursiva

### Sobre JavaScript/TypeScript
- O método `sort()` tem comportamentos peculiares que devem ser conhecidos
- Sempre forneça função de comparação para `sort()` quando necessário
- `localeCompare()` é essencial para ordenação de strings em português
- `Math.round()` é usado para garantir índices inteiros na divisão

### Sobre Performance
- Diferença drástica entre O(log n) e O(n) em grandes datasets
- Busca binária em 1 milhão de elementos: máximo 20 comparações
- Busca linear no mesmo dataset: até 1 milhão de comparações

---

*Este documento faz parte dos meus estudos sobre algoritmos e estruturas de dados.*