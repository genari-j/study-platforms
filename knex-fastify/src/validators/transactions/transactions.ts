import { z } from 'zod'

export const getTransactionByIdParamsSchema = z.object({
  id: z.string().uuid(),
})

export const createTransactionBodySchema = z.object({
  title: z.string(),
  amount: z.coerce.number(),
  type: z.enum(['credit', 'debit']),
})
