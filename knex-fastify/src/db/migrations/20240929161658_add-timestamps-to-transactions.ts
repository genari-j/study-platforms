import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('transactions', (table) => {
    table.timestamp('updated_at').nullable()
    table.timestamp('deleted_at').nullable().defaultTo(null)
  })

  await knex('transactions').update({ updated_at: knex.fn.now() })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('transactions', (table) => {
    table.dropColumn('updated_at')
    table.dropColumn('deleted_at')
  })
}
