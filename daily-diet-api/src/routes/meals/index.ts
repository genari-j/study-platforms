import type { FastifyInstance, FastifyPluginAsync } from 'fastify'

import { authMiddleware } from '~/middlewares/auth'

import { MealsController } from '~/controllers/index'
import { MealsRepository } from '~/models/repositories/index'

const controller = new MealsController(MealsRepository)

const mealsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
	fastify.post('/meals', { preHandler: [authMiddleware] }, controller.create.bind(controller))

	fastify.get('/meals', { preHandler: [authMiddleware] }, controller.getAll.bind(controller))
	fastify.get('/meals/:id', { preHandler: [authMiddleware] }, controller.getById.bind(controller))
}

export default mealsRoutes
