import mongoose from 'mongoose'

export function connectDb(config: { uri: string }): Promise<any> {
  mongoose.connection.on('connected', () =>
    console.log('✔ Database connected!')
  );
  mongoose.connection.on('error', (error) => console.error(error));
  return mongoose.connect(config.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
}