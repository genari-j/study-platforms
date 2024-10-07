import { app } from './app'
import { env } from './validators/env/env'

app
  .listen({
    port: env.APP_PORT,
  })
  .then(() => {
    console.log('API is running on port: 3002')
  })
