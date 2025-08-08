Strategy pattern

Contexto, sua api é um serviço de um sistema financeiro, essa funcionalidade(este endpoint) basicamente é responsavel por calcular os impostos dos usuários deste sistema, que são empresários, empreendedores, vendedores e etc. Que faturaram determinado valor durante um periodo e precisa saber quanto de imposto ele irá pagar ao governo. Então ele manda essa requisição ao sistema com o valor que ele faturou e qual o tipo de imposto ele está querendo saber o valor para pagar. Dai o sistema irá realizar o calculo e devolver o valor para ele.

O cenário ficticio criado: irei atuar como um desenvolvedor que irá realizar uma manutenção nesta funcionalidade da api.

corpo da requisição do endpoint da funcionalidade

```json
{
    taxType:"ISS",
    amount:10000
}

```
O servidor recebe esta requisição, chama um controller que por sua vez chama a classe responsavel pelo calculo, justamente para não ter regras de negocios dentro do controller(boas praticas). Esta classe por sinal tem um metodo calculate que recebe como parametro o amount e o taxtype:

```js

class TaxCalculator {
  async calculate(amount, taxType) {
    if (taxType === "ICMS") {
      return (amount * 4) / 100;
    }
    if (taxType === "ISS") {
      return (amount * 11) / 100;
    }
    if (taxType === "IPI") {
      return (amount * 15) / 100;
    }
    throw new Error("invalid tax type.");
  }
}


```

Problemas encontrados:
Single responsibility principle
 - Classe com mais de uma responsabilidade

Open Closed principle
 - Classe aberta para modificações
 - Cada vez que eu preciso colocar um if nessa classe fere este parametro
 - ex: surgiu um novo imposto vou precisar acrescentar um novo if dentro da classe

Obsessão por tipos primitivos 
 - Utilizar tipos primitivos para implicar contexto da nossa classe

Boas praticas e dicas:
Sempre que houver uma comparação com uma string que represente um "tipo" de algo no seu sistema, como uma variavel que acabou de chegar, esta string irá virar uma classe !