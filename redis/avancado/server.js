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
  const time = Math.random() * 10000;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["Produto 1", "Produto 2", "Produto 3"]);
    }, time); // função que irá variar o tempo de retorno.
  });
};

//rota utilizada para solicitação de recursos
app.get("/", async (req, res) => {
  const productsFromCache = await redisClient.get("getAllProducts"); //busco dentro do meu cache se a chave referente ao recurso existe
  const isProductsFromCacheStale = !(await redisClient.get(
    "getAllProducts:validation"
  )); // Variavel guardada em cache para verificar se esses dados do cache estão obsoletos

  if (isProductsFromCacheStale) {
    const isRefetching = !!(await redisClient.get(
      "getAllProducts:isRefetching"
    )); // Verifique se existe o aviso de que o recurso já está sendo buscado  e transformo em booleano
    console.log("🚀 ~ app.get ~ isRefetching:", isRefetching);
    if (!isRefetching) {
      await redisClient.set("getAllProducts:isRefetching", "true", {
        expiration: { type: "EX", value: 20 },
      }); // Limito a 20 segundos a tentativa de atualizar a cache caso ao contrario tentar novamente
      // bloco de codigo que irá ficar em segundo plano para atualização do cache que está obsoleto
      setTimeout(async () => {
        console.log("🚀 Cache is stole - refetching...");
        const products = await getAllProducts();
        await redisClient.set("getAllProducts", JSON.stringify(products));
        await redisClient.set("getAllProducts:validation", "true", {
          expiration: { type: "EX", value: 5 },
        }); // Quem controla a validação da cache agora é a variavel getAllProducts:validation
        await redisClient.del("getAllProducts:isRefetching"); // Deleto o paremtro caso eu consiga realizar o refetch completo
      }, 0); // Função para exemplificar o background jobs para atualização do recurso na cache, ex: serviço de mensageria
    }
  }

  if (productsFromCache) {
    //caso ela exista
    const products = JSON.parse(productsFromCache);
    return res.send({ products }); // retorno todo o conteudo do meu cache evitando o tempo de busca pelo recurso na fonte
  }
  //caso não exista
  const products = await getAllProducts(); // busco o meu recurso na fonte
  await redisClient.set("getAllProducts", JSON.stringify(products));
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
