import { Client } from 'ts-postgres'

export default async function PSQLClient() {
  const client = new Client({
    database: 'beachstats',
    user: 'hannes'
  })
  await client.connect()
  console.log('Connected to database: ' + client.config.database)
  return client
}
