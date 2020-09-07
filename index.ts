import express from 'express';
import cors from 'cors';
import depthLimit from 'graphql-depth-limit';
import { ApolloServer } from 'apollo-server-express';
import schema from './graphql/schema';

const PORT = process.env.PORT || 4000;

const startServer = () => {
  try {
    const app = express();

    const server = new ApolloServer({
      schema,
      validationRules: [depthLimit(10)],
      playground: true,
    });

    app.use('*', cors());
    app.get('/', (req, res) => res.send('GraphQL API'));

    server.applyMiddleware({ app });

    app.listen({ port: PORT }, () =>
      console.log(`🚀 Server ready on port: ${PORT}`)
    );
  } catch (err) {
    console.log(`❌  Something went wrong: \n ${err}`);
  }
};

async function connectDb(): Promise<any> {
  // todo
}

startServer();
