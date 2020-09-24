const http = require("http");
const express = require("express");
const { getMesh, findAndParseConfig } = require("@graphql-mesh/runtime");
const graphqlHTTP = require("express-graphql");

const app = express();

const getConfig = async () => {
  const meshConfig = await findAndParseConfig();

  const { schema } = await getMesh(meshConfig);

  return { schema };
};

getConfig().then(({ schema, contextBuilder }) => {
  app.use(
    "/",
    graphqlHTTP(async req => ({
      schema,
      graphiql: true,
    }))
  );
});

const server = http.createServer(app);

const PORT = 8081;
server.listen(PORT, () => {
  console.log("Server started. GraphiQL at http://localhost:8081/");
});
