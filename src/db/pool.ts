import { Pool } from 'pg'

// pools will use environment variables for connection information
const pool = new Pool()

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

pool.query('SELECT NOW()').then((res) => {
  console.log(`connected to DB at ${res.rows[0].now}`)
})

export default pool
