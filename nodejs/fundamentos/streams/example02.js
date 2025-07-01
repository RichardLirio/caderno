import { pipeline, Readable, Writable, Transform } from "stream";
import { promisify } from "util";
import { createWriteStream } from "fs";

const pipelineAsync = promisify(pipeline); //Somente tornado o pipeline async para ficar mais facil de trabalhar

{
  //colocado chaves para criar o contexto para as variaveis
  const readableStream = Readable({
    read: function () {
      // usando o funtion para poder utilizar o this dentro dessa função
      this.push("Hello Dude!!0");
      this.push("Hello Dude!!1");
      this.push("Hello Dude!!2");
      this.push(null);
    },
  });

  const writebleStream = Writable({
    write(chunk, enconding, cb) {
      console.log("msg: ", chunk.toString());
      cb();
    },
  });

  await pipelineAsync(readableStream, writebleStream);

  console.log("Processo:01 finalizado.");
}
{
  const readableStream = Readable({
    read() {
      for (let index = 0; index < 1e5; index++) {
        //detalhe 1e5 é o numero 1 com cinco zeros
        const person = { id: Date.now() + index, name: `Richard-${index}` }; // Simulando a criação de uma pessoa
        const data = JSON.stringify(person);
        this.push(data); //cada push cai para a proxima fase do pipeline levando um chunk
      }
      // push nulo para avisar que terminou
      this.push(null);
    },
  });

  const writableMapToCSV = Transform({
    transform(chunk, enconding, cb) {
      const data = JSON.parse(chunk); // Cada chunck eu dou um pase
      const result = `${data.id},${data.name.toUpperCase()}\n`;

      cb(null, result); //por padrão o primeiro parametro do callback é erro e o segundo é sucesso
    },
  });

  const setHeader = Transform({
    transform(chunk, enconding, cb) {
      this.couter = this.couter ?? 0; //Criando contagem de linhas para colocar somente na primeira linha o header criado
      if (this.couter) {
        return cb(null, chunk);
      }
      this.couter += 1;
      cb(null, "id,name\n".concat(chunk)); //Criando as duas colunas do CSV
    },
  });

  await pipelineAsync(
    readableStream,
    writableMapToCSV,
    setHeader,
    createWriteStream("my.csv")
  );

  console.log("Processo:02 finalizado. Arquivo criado.");
}
