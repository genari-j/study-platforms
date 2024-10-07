import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import { execSync } from 'node:child_process'
import request from 'supertest'

import { app } from '../../app'

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  // CREATE A NEW TRANSACTION
  it('should be able to create a new transaction', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'Test Transaction',
        amount: 4998,
        type: 'credit',
      })
      .expect(201)
  })

  // GET ALL TRANSACTIONS
  it('should be able to list all transactions', async () => {
    const createdTransaction = await request(app.server)
      .post('/transactions')
      .send({
        title: 'Test Transaction',
        amount: 4998,
        type: 'credit',
      })

    const cookies = createdTransaction.get('Set-Cookie')

    const transactions = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies!)
      .expect(200)

    expect(transactions.body.data.transactions).toEqual([
      expect.objectContaining({
        title: 'Test Transaction',
        amount: 4998,
      }),
    ])
  })

  // GET TRANSACTION BY ID
  it('should be able to get a specific transaction', async () => {
    const createdTransaction = await request(app.server)
      .post('/transactions')
      .send({
        title: 'Test Transaction',
        amount: 4998,
        type: 'credit',
      })

    const cookies = createdTransaction.get('Set-Cookie')

    const createdTransactionId =
      createdTransaction.body.data.createdTransaction[0].id

    const transaction = await request(app.server)
      .get(`/transactions/${createdTransactionId}`)
      .set('Cookie', cookies!)
      .expect(200)

    expect(transaction.body.data.transaction).toEqual(
      expect.objectContaining({
        title: 'Test Transaction',
        amount: 4998,
      }),
    )
  })

  // GET TRANSACTIONS SUMMARY
  it('should be able to get the summary', async () => {
    const createdTransaction = await request(app.server)
      .post('/transactions')
      .send({
        title: 'Test Transaction',
        amount: 4998,
        type: 'credit',
      })

    const cookies = createdTransaction.get('Set-Cookie')

    await request(app.server)
      .post('/transactions')
      .set('Cookie', cookies!)
      .send({
        title: 'Test Transaction',
        amount: 2780,
        type: 'debit',
      })

    const summary = await request(app.server)
      .get('/transactions/summary')
      .set('Cookie', cookies!)
      .expect(200)

    expect(summary.body.data.summary).toEqual(
      expect.objectContaining({
        amount: 2218,
      }),
    )
  })
})
