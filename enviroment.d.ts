declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TYPEORM_CONNECTION: 'mongodb';
      TYPEORM_HOST: string | undefined;
      TYPEORM_PORT: string | undefined;
      TYPEORM_USERNAME: string | undefined;
      TYPEORM_PASSWORD: string | undefined;
      TYPEORM_DATABASE: string | undefined;
      TYPEORM_SYNCHRONIZE: boolean;
      TYPEORM_LOGGING: boolean;
      TYPEORM_ENTITIES: string[] | undefined;
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
      NODE_ENV: 'development' | 'production';
      PORT?: number;
    }
  }
}

export {};
