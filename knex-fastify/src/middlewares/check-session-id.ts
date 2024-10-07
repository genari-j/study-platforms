import { FastifyReply, FastifyRequest } from 'fastify'

export const checkSessionIdExists = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const sessionId = request.cookies.sessionId

  if (!sessionId) {
    return reply.code(401).send({
      error: true,
      message: 'Não autorizado!',
    })
  }
}
