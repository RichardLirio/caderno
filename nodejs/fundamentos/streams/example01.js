//Exemplo 01 basico de streams
// const stdin = process.stdin
//   .on("data", (msg) => {
//     process.stdout.write("saida terminal: " + msg.toString()); // Escreve no stdout
//   })
//   .on("error", (error) => console.log("erro no stdin:", error.toString()));

//Exemplo 02 de streams com o http
// iremos rodar o comando node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file
// comando para criar um grande arquivo de quase 1 gb
// import http from "http";
// import { createReadStream } from "fs";
// http
//   .createServer((req, res) => {
//     createReadStream("big.file").pipe(res); // cria uma readable stream que vai lendo pedaço a pedaço(chunks) e enviando para response
//   })
//   .listen(3000, () => console.log("🚀 ~ Server running at 3000")); // exemplo de stream simples via response http

//Exemplo 03 com o sockets
import net from "node:net";
net.createServer((socket) => socket.pipe(process.stdout)).listen(1338);
//executar node -e "process.stdin.pipe(require('net').connect(1338))"

//Dica codigos com .on("error") ou .on("close") ou algum tipo de .on() procurar se é uma stream, se for a melhor maneira de trabalhar com ele é utilizando as streams readable, writable e transform
// Exemplos mais comuns de caso de usos de streams : Leitura e escrita de arquivos grandes, Relatorios, Extração e compressão de arquivos grandes, processamento de audio e video, Processos de ETL
