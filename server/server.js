const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const path = require('path');
const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

async function startApolloServer() {

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
  });
  await server.start();

  const app = express();
  const PORT = process.env.PORT || 3001;

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // if we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  server.applyMiddleware({ app });

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });

  // app.use(routes);

  await new Promise(resolve => db.once('open', () => resolve()));
  await new Promise(resolve => app.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  return { server, app };
}

startApolloServer()
  .then(({ server, app }) => {
    console.log('Done starting.');
  })
  .catch(err => {
    console.log('Error while starting Apollo server: ', err);
  })
