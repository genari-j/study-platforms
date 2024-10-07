import { FastifyInstance } from 'fastify'
import { knex } from '../../db/db-config'
import { checkSessionIdExists } from '../../middlewares/check-session-id'
import crypto from 'node:crypto'

import {
  getTransactionByIdParamsSchema,
  createTransactionBodySchema,
} from '../../validators/transactions/transactions'

export const transactionsRoutes = async (app: FastifyInstance) => {
  // GET ALL
  app.get(
    '/transactions',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const { sessionId } = request.cookies

      const transactions = await knex('transactions')
        .where('session_id', sessionId)
        .select()

      return reply.code(200).send({
        error: false,
        data: { transactions },
      })
    },
  )

  // GET BY ID
  app.get(
    '/transactions/:id',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const { sessionId } = request.cookies

      const { id } = getTransactionByIdParamsSchema.parse(request.params)

      const transaction = await knex('transactions')
        .where({
          session_id: sessionId,
          id,
        })
        .first()

      return reply.code(200).send({
        error: false,
        data: { transaction },
      })
    },
  )

  // TRANSACTIONS SUMMARY
  app.get(
    '/transactions/summary',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const { sessionId } = request.cookies

      const summary = await knex('transactions')
        .where('session_id', sessionId)
        .sum('amount', { as: 'amount' })
        .first()

      return reply.code(200).send({
        error: false,
        data: { summary },
      })
    },
  )

  // CREATE
  app.post('/transactions', async (request, reply) => {
    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )

    // Procurando dentro dos cookies da requisição se já existe um sessionId
    let sessionId = request.cookies.sessionId

    // Criando cookie com expiração caso não existir e adicionando em todas as rotas
    if (!sessionId) {
      sessionId = crypto.randomUUID()
      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
    }

    const createdTransaction = await knex('transactions')
      .insert({
        id: crypto.randomUUID(),
        title,
        amount: type === 'credit' ? amount : amount * -1,
        session_id: sessionId,
      })
      .returning('*')

    return reply.code(201).send({
      error: false,
      data: { createdTransaction },
    })
  })
}
