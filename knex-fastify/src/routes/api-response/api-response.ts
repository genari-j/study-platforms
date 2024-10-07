import { FastifyInstance } from 'fastify'

export const apiResponseRoutes = async (app: FastifyInstance) => {
  app.get('/', async (_request, reply) => {
    return reply.send({
      error: false,
      message: 'API is running 🚀',
    })
  })
}
