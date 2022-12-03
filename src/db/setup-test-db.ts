import { Pool } from 'pg'

async function setup() {
  const pool = new Pool({
    host: 'localhost',
    database: 'postgres',
    user: 'hannes',
    password: '123456',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
  })

  const test_db = 'beachstats_test'
  console.log(`Creating database: ${test_db}`)
  // drop
  let res = await pool.query(
    `DROP DATABASE IF EXISTS "${test_db}" WITH (FORCE)`
  )
  console.log(res.command)

  // create
  res = await pool.query(`CREATE DATABASE "${test_db}"`)
  console.log(res.command)

  // list
  res = await pool.query(
    'SELECT datname FROM pg_database WHERE datistemplate = false'
  )
  console.log(res.rows)

  process.exit(0)
}

setup()
