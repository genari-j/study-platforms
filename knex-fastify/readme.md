#### Fastify - Knex - Typescript - SQLite

### RUN SERVER
`npm run dev`

### MIGRATIONS
create -> `npm run knex -- migrate:make tablename`
run migrate to db -> `npm run knex -- migrate:latest`
rollback last migration -> `npm run knex -- migrate:rollback`

### TESTS
run -> `npm test`