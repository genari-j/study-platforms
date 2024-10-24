import fastify from 'fastify'
import cors from '@fastify/cors'

import { appRoutes } from '~/routes/index'

import { databaseHealth } from '~/helpers/index'
import { env } from '~/validators/index'

const app = fastify()

app.register(cors, {
	origin: '*',
	methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
})

for (const route of appRoutes) {
	app.register(route)
}

app.listen({ port: Number(env.APP_PORT) }).then(async () => {
	await databaseHealth()
	console.log(`Application is running on port: ${env.APP_PORT}`)
})
