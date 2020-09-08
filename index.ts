import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import depthLimit from 'graphql-depth-limit';
import { ApolloServer } from 'apollo-server-express';

import schema from './graphql/schema';
import Auth from './lib/Auth';

dotenv.config({ path: `${__dirname}/.env` });

const PORT = process.env.PORT || 4000;

async function startServer(): Promise<void> {
  try {
    const app: Application = express();

    const server = new ApolloServer({
      schema,
      validationRules: [depthLimit(10)],
      playground: true,
      context: Auth,
    });

    await connectDb({
      uri: (process.env.DATABASE_URI as string) || 'http://localhost:27017',
    });

    app.use('*', cors());
    app.get('/', (req: Request, res: Response) => res.send('GraphQL API'));

    server.applyMiddleware({ app });

    app.listen({ port: PORT }, () =>
      console.log(`🚀 Server ready on port: ${PORT}`)
    );
  } catch (err) {
    console.log(`❌  Something went wrong: \n ${err}`);
  }
}

function connectDb(config: { uri: string }): Promise<any> {
  return mongoose.connect(config.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
}

startServer();
