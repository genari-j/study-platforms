import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'stage', 'test', 'production'])
    .default('development'),
  APP_PORT: z.coerce.number().default(3002),
  DB_URL: z.string(),
})

const tmpEnv = envSchema.safeParse(process.env)

if (tmpEnv.success === false) {
  console.error('⚠️ Variáveis de ambiente inválidas', tmpEnv.error.format())

  throw new Error('Variáveis de ambiente inválidas.')
}

export const env = tmpEnv.data
