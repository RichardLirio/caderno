//Função para realizar a pesquisa binaria de numeros
function pesquisa_binaria(lista: number[], item: number) {
  let baixo = 0; //ponteiro baixo
  let alto = lista.length - 1; //ultimo item da lista
  let meio = 0; //ponteiro alto
  let chute = 0; //chute para tentar encontrar o item

  let listaOrdenada = lista.sort((a: number, b: number) => {
    return a - b;
  }); // ordena a lista antes de realizar a busca, ordenação feita de maneira correta utilizando o metodo sort para uma lista de numeros
  //o sort por padrão verifica doi numeros e retorna um numero positivo, negativo ou 0, e leva esse numero retornado como paremetro para ordenação na lista.
  // em caso de strings o numero usado para comparação é o valor utf-16 do caracter
  // Com isso devemos tomar cuidado ao ordenar diretamente pelo metodo sort

  while (baixo <= alto) {
    meio = Math.round((baixo + alto) / 2); //metade da lista
    chute = listaOrdenada[meio]; //chute será o item no meio da lista

    if (chute === item) {
      return meio; //se ja bater retorna o chute
    }
    if (chute > item) {
      alto = meio - 1; // se o chute for maior eu mudo o ponteiro alto para o primeiro item antes do meio e tento novamente
    } else {
      baixo = meio + 1; // se não eu colo o ponteiro baixo como o primeiro item depois do meio e tento novamente
    }
  }
  return null;
}

//Função para busca binaria de palavras levando em consideração a ordenação da lista corretamente
function pesquisa_binaria_palavras(lista: string[], palavra: string) {
  let baixo = 0;
  let alto = lista.length - 1;
  let meio;
  let chute;

  let listaOrdenada = lista.sort((a: string, b: string) => {
    return a.localeCompare(b);
  }); // metodo sort utilizando strings reques atenção pois ele leva em consideração o valor do utf-16
  console.log("🚀 ~ pesquisa_binaria_palavras ~ listaOrdenada:", listaOrdenada); // Demonstração da lista ordenada

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

console.log(
  pesquisa_binaria_palavras(
    ["abner", "angelo", "Carmem", "Reginaldo", "Ezila", "Thais"],
    "Ezila"
  )
);
