import { ApolloServer } from 'apollo-server-express';
import express, { Application, Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import depthLimit from 'graphql-depth-limit';
import cookieParser from 'cookie-parser';

import { connectDb } from './db';
import { schema } from './graphql/schema';
import { context } from './graphql/context';
import { refreshToken } from './middlewares/refreshToken';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: `${__dirname}/.env` });
}

const PORT = process.env.PORT || 4000;

async function startServer(): Promise<void> {
  try {
    const app: Application = express();
    const server = new ApolloServer({
      schema,
      validationRules: [depthLimit(10)],
      playground: true,
      context,
    });

    await connectDb({
      uri: (process.env.DATABASE_URI as string) || 'http://localhost:27017',
    });

    app.set('trust proxy', 1);

    app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.use(refreshToken);

    server.applyMiddleware({ app, cors: false });

    app.get('*', (req: Request, res: Response) =>
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    );

    app.listen({ port: PORT }, () =>
      console.log(`• Server ready on port: ${PORT}`)
    );
  } catch (err) {
    console.log(`× Something went wrong: \n ${err}`);
  }
}

startServer();
