# 📘 Streams em Node.js - Fundamentos

Bem-vindo ao repositório dedicado ao estudo de **Streams** em **Node.js**, localizado na pasta `/nodejs/fundamentos/streams` do meu **Caderno de Estudos**. Este projeto foi criado para solidificar meus conhecimentos sobre o uso de streams, uma ferramenta essencial para processar grandes volumes de dados de forma eficiente, evitando travamentos e otimizando o desempenho de aplicações.

A ideia aqui é explorar os conceitos básicos e práticos das streams, incluindo **Readable Streams**, **Transform Streams**, e **Writable Streams**, com exemplos funcionais que demonstram como lidar com grandes arquivos e processamentos complexos.

---

## 🎯 Objetivo

O objetivo deste repositório é entender como as streams no Node.js podem ser usadas para ler, transformar e escrever dados em pedaços (chunks), especialmente em cenários onde grandes quantidades de dados (como arquivos de 2 GB ou mais) poderiam quebrar uma aplicação se processadas de uma só vez. Inclui exemplos práticos e analogias para facilitar o aprendizado.

---

## 💡 O que são Streams?

Grandes cargas de memória de uma só vez em Node.js podem travar a aplicação. Tentar ler um arquivo muito grande, como 2 GB, por exemplo, é um caso clássico de uso onde streams se tornam indispensáveis. Streams permitem ler uma carga massiva de dados, processá-los por partes e devolver o resultado apenas quando todo o processamento estiver concluído.

No Node.js, ao receber um arquivo, ele é transformado em **Buffers**, que são divididos em pedaços chamados **Chunks**. Esses chunks são processados sequencialmente, semelhante a um fluxo contínuo.

### Analogia com o Mundo Real

Imagine uma pepita de ouro bruta de 10 GB, representando nosso arquivo bruto. Para processá-la:
- **Derreter a pepita** equivale a transformá-la em **Buffers/Chunks**.
- **Jogar em um funil** representa o uso de uma **Readable Stream**, que fornece os dados para o processamento.
- **Filtrar e adicionar produtos químicos** (remover impurezas, transformar formatos) é o papel das **Transform Streams**.
- **Transformar em pequenas pepitas e retirá-las** é a função das **Writable Streams**, que entregam o produto final (ex: console, arquivo, banco de dados).

Assim, em vez de jogar uma tonelada de ouro no funil de uma vez, diluímos em formato líquido (stream) e processamos sob demanda. Esse "funil" em Node.js é chamado de **Pipelines**.

### Tipos de Streams

- **Readable Stream**: Fonte de dados, como um arquivo, banco de dados, requisição web ou qualquer entrada de dados.
- **Transform Stream**: Etapa de conversão, onde os chunks são mapeados, filtrados ou transformados antes de seguir adiante.
- **Writable Stream**: Etapa final, que recebe cada chunk e o envia para uma saída, como console.log, arquivo ou cliente.

### Observações
- Web APIs e o módulo nativo HTTP do Node.js utilizam streams internamente. Por exemplo, uma requisição (`request`) é uma **Readable Stream**, e a resposta (`response`) é uma **Writable Stream**.
- Casos de uso comuns incluem leitura/escrita de arquivos grandes, relatórios, extração/compressão de arquivos, processamento de áudio/vídeo e processos ETL.

---

## 🚀 Exemplos Práticos

Este repositório contém exemplos práticos que demonstram o uso de streams em diferentes cenários.

### Estrutura do Código

#### Exemplo 01 (`example01.js`)
Este arquivo apresenta casos básicos de streams com diferentes abordagens:

- **Exemplo 01 - `stdin` e `stdout`**:
  - Lê dados do terminal (`process.stdin`) e escreve no terminal (`process.stdout`).
  - Uso: `node -e "process.stdin.on('data', msg => process.stdout.write(msg.toString()))"`.

- **Exemplo 02 - HTTP com Streams**:
  - Cria um servidor HTTP que lê um arquivo grande (`big.file`, gerado com `node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file`) e o envia como resposta usando `pipe`.
  - Uso: `node example01.js` e acesse `http://localhost:3000`.

- **Exemplo 03 - Sockets**:
  - Utiliza `net` para criar um servidor que recebe dados via socket e os redireciona para `stdout`.
  - Uso: Execute `node example01.js` e envie dados com `node -e "process.stdin.pipe(require('net').connect(1338))"`.

- **Dica**: Procure por `.on("error")`, `.on("close")` ou outros `.on()` para identificar streams. A melhor abordagem é usar **Readable**, **Writable**, e **Transform Streams**.

#### Exemplo 02 (`example02.js`)
Este arquivo mostra um exemplo mais avançado, utilizando pipelines para processar dados:

- **Processo 01**:
  - Cria uma **Readable Stream** que emite mensagens ("Hello Dude!!0", "Hello Dude!!1", "Hello Dude!!2") e as envia para uma **Writable Stream** que as exibe no console.
  - Uso: Demonstra o fluxo básico de dados com `pipelineAsync`.

- **Processo 02**:
  - Gera 100.000 objetos (`person`) em uma **Readable Stream**.
  - Usa uma **Transform Stream** (`writableMapToCSV`) para converter cada objeto em formato CSV (ID, Nome em maiúsculo).
  - Usa outra **Transform Stream** (`setHeader`) para adicionar um cabeçalho ao CSV na primeira linha.
  - Salva o resultado em um arquivo `my.csv` com uma **Writable Stream** (`createWriteStream`).
  - Uso: Gera um arquivo CSV com dados processados em partes.

### Código Resumido

#### `example01.js` (Trecho)
```javascript
import net from "node:net";
net.createServer((socket) => socket.pipe(process.stdout)).listen(1338);
```

#### `example02.js` (Trecho)
```javascript
const pipelineAsync = promisify(pipeline);

const readableStream = Readable({
  read() {
    for (let index = 0; index < 1e5; index++) {
      const person = { id: Date.now() + index, name: `Richard-${index}` };
      this.push(JSON.stringify(person));
    }
    this.push(null);
  },
});

await pipelineAsync(
  readableStream,
  writableMapToCSV,
  setHeader,
  createWriteStream("my.csv")
);
```

---

## 🛠 Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para os exemplos.
- **Streams**: Módulo nativo para leitura, transformação e escrita de dados.

---

## 🧪 Como Rodar o Projeto

### Pré-requisitos
- **Node.js** (versão 16 ou superior)

### Passos

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/caderno.git
   cd caderno/nodejs/fundamentos/streams
   ```

2. **Crie um arquivo grande para testes**:
   ```bash
   node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file
   ```
   - Isso gera um arquivo de quase 1 GB chamado `big.file`.

3. **Execute os exemplos**:
   - Para `example01.js`:
     - `node example01.js` e acesse `http://localhost:3000` para o exemplo HTTP, ou use sockets com `node -e "process.stdin.pipe(require('net').connect(1338))"`.
   - Para `example02.js`:
     - `node example02.js` para gerar o arquivo `my.csv`.

---

## 📁 Estrutura do Projeto

```plaintext
streams/
├── example01.js
├── example02.js
└── README.md
```

---

## 📌 Conceitos Demonstrados

- **Streams Básicas**: Uso de `Readable`, `Writable`, e `Transform Streams` com exemplos simples.
- **Pipelines**: Encadeamento de streams com `pipeline` para processar dados em etapas.
- **Processamento de Arquivos Grandes**: Leitura e escrita de dados em chunks para evitar travamentos.
- **HTTP e Sockets**: Aplicação de streams em requisições web e comunicação via socket.
- **Transformação de Dados**: Conversão de objetos JSON para CSV com controle de cabeçalho.

---

## 🔍 Considerações Adicionais

- **Eficiência**: Streams são ideais para cenários onde a memória é um limite, como relatórios ou arquivos grandes.
- **Escalabilidade**: O uso de pipelines permite processar dados em tempo real, mesmo em grandes volumes.
- **Extensibilidade**: A lógica pode ser adaptada para integrações com bancos de dados, APIs ou compressão de arquivos.

Este repositório é uma base prática para entender e aplicar streams em Node.js, com foco em fundamentos e casos reais de uso.