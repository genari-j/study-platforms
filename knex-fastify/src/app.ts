import fastify from 'fastify'
import cookie from '@fastify/cookie'

import { appRoutes } from './routes'

export const app = fastify()

app.register(cookie)

for (const route of appRoutes) {
  app.register(route)
}
