export interface DBParamsTypes {
  host: string;

  port: number;

  user: string;

  password: string;

  database: string;
}

export const GetDBParams = (): DBParamsTypes => {
  const env = process.env.NODE_ENV;

  if (env == "development")
    return {
      host: process.env.DEV_HOST!,

      port: parseInt(process.env.DEV_PORT!),

      user: process.env.DEV_USER!,

      password: process.env.DEV_PASSWORD!,

      database: process.env.DEV_DB_NAME!,
    };
  else
    return {
      host: process.env.HOST!,

      port: parseInt(process.env.PORT!),

      user: process.env.USER!,

      password: process.env.PASSWORD!,

      database: process.env.DB_NAME!,
    };
};
