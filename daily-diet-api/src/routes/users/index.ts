import type { FastifyInstance, FastifyPluginAsync } from 'fastify'

import { authMiddleware } from '~/middlewares/auth'

import { UsersController } from '~/controllers/index'

import { UsersRepository, ProfilesRepository, ProfilePermissionsRepository } from '~/models/repositories/index'

const controller = new UsersController(UsersRepository, ProfilesRepository, ProfilePermissionsRepository)

const usersRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
	fastify.post('/signin', controller.signIn.bind(controller))
	fastify.post('/signup', controller.create.bind(controller))

	fastify.get('/verify-token', controller.verifyToken.bind(controller))
	fastify.post('/password/recovery', controller.userRecoveryPassword.bind(controller))
	fastify.patch('/password/recovery/set-new', controller.updateUserPassword.bind(controller))
	fastify.patch('/password/user/:id/set-new', controller.updateLoggedUserPassword.bind(controller))

	fastify.get('/users', { preHandler: [authMiddleware] }, controller.getAll.bind(controller))
	fastify.get('/users/:id', { preHandler: [authMiddleware] }, controller.getById.bind(controller))

	fastify.put('/users/:id', { preHandler: [authMiddleware] }, controller.update.bind(controller))
	fastify.patch('/users/:id', { preHandler: [authMiddleware] }, controller.disable.bind(controller))
}

export default usersRoutes
