import { knex as setupKnex, Knex } from 'knex'
import { env } from '../validators/env/env'

export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: env.DB_URL,
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './src/db/migrations',
  },
}

export const knex = setupKnex(config)
