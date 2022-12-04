import { Pool } from 'pg'

async function setup() {
  // info
  const test_db = process.env.PGDATABASE
  console.log(
    `preparing 
      test-db:    ${test_db}
      on host:    ${process.env.PGHOST}:${process.env.PGPORT} 
      with user:  ${process.env.PGUSER}`
  )
  console.log(process.argv)

  const pool = new Pool({
    host: process.env.PGHOST,
    database: 'postgres', // connect to standard db in order to setup the test-db
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
  })

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
  console.log('all databases: ')
  console.log(res.rows)

  process.exit(0)
}

setup()
