import express from "express";
import { createClient } from "redis";
const app = express();
const port = 3000;

const redisClient = createClient({
  url: "redis://localhost:6379",
  password: "@a123456",
}); // Criando o client do redis

// Metodo para exemplificar uma chamada para o banco de dados ou algum outro recurso que demande bastante tempo
const getAllProducts = async () => {
  const time = Math.random() * 5000;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["Produto 1", "Produto 2", "Produto 3"]);
    }, time); // função que irá variar o tempo de retorno.
  });
};

// Calculo para determinar o uso do cache ou não e quanto tempo deixar ele em cache:
// 100 requisições por minuto no servidor , que em media leva de 3 a 4 segundos para retornar
// 100 * 4s = 400 segundos de tempo medio.
// Se eu colocar em cache por 20 segundos, somente a primeira requisição das mesmas 100 irá demorar 4 segundos e as restantes serem esponencialemnte mais rapidas
// Calculo tempo recurso = 6*2 = 12 segundos de tempo medio
//aplicar o redis para o cache a side. Utilizando o cache ao lado do servidor para verificar as chamadas antes de bater na fonte de dados em disco
//Redis trabalha a nivel de memoria ram, por isso é mais rapido
//Redis é baseado em keys e values, do tipo chave valor para guardar as informações de acordo com as chaves, atraves de set e get

//rota utilizada para solicitação de recursos
app.get("/", async (req, res) => {
  const productsFromCache = await redisClient.get("getAllProducts"); //busco dentro do meu cache se a chave referente ao recurso existe
  if (productsFromCache) {
    //caso ela exista
    const products = JSON.parse(productsFromCache);
    return res.send({ products }); // retorno todo o conteudo do meu cache evitando o tempo de busca pelo recurso na fonte
  }
  //caso não exista
  const products = await getAllProducts(); // busco o meu recurso na fonte
  await redisClient.set("getAllProducts", JSON.stringify(products), {
    expiration: { type: "EX", value: 20 }, // TTL(TIME TO LIVE) : Configuração para o tempo que eu desejo que o recurso fique disponivel no cache em segundos
  }); // Salvo o recurso dentro do redis para as proximas solicitações
  res.send({ products }); // retorno os produtos buscados na fonte
});

//rota para salvar um novo recurso somente para fins de estudo
app.get("/saved", async (_, res) => {
  await redisClient.del("getAllProducts");
  res.send({ ok: true });
});

const startup = async () => {
  await redisClient.connect(); //realizo a conexão com o redis
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
};

startup(); // iniciando o server
