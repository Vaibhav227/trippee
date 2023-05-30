type KnexConfig = {
  [key: string]: string | object;
};

const knexConfig: KnexConfig = {
  dev: {
    client: "pg",
    connection: {
      host: "localhost",
      user: "pguser",
      password: "pgpassword",
      database: "trippee",
    },
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },
};

export default knexConfig;
