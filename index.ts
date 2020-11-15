import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express, { Application, Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import depthLimit from 'graphql-depth-limit';
import cookieParser from 'cookie-parser';
import { schema } from './graphql/schema';
import { context } from './graphql/context';
import { refreshToken } from './middlewares/refreshToken';
import { createConnection } from 'typeorm';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: `${__dirname}/.env` });
}

async function main(): Promise<void> {
  console.log('• Starting the server...');
  await createConnection({
    name: 'default',
    type: 'postgres',
    host: process.env.TYPEORM_HOST || 'localhost',
    port: parseInt(process.env.TYPEORM_PORT || '5432', 10),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE),
    logging: Boolean(process.env.TYPEORM_LOGGING),
    entities: ['graphql/entities/*.*'],
  });

  const app: Application = express();
  const server = new ApolloServer({
    schema,
    validationRules: [depthLimit(10)],
    playground: true,
    context,
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

  app.listen({ port: process.env.PORT || 4000 }, () =>
    console.log(`• Server ready on port: 4000`)
  );
}

main().catch(error => {
  console.log(`× Something went wrong: \n ${error}`);
});
