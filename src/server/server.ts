import express from 'express'
import PSQLClient from '../db/client'

export const setupExpressServer = () => {
  return new Promise<express.Express>((resolve) => {
    const app = express()
    app.get('/', (req, res) => {
      res.json('Hello World!')
    })

    // app.get('/createPlayer', async (req, res) => {
    //   const client = await PSQLClient()
    //   const result = await client.query(
    //     "INSERT INTO \"Players\" VALUES ('02.02.2022', 1, 3, 'Kategorie 2', 'Beach61 Berlin', 1, 8);"
    //   )
    //   res.json(result.rows)
    // })

    app.get('/players', async (req, res) => {
      const client = await PSQLClient()
      const result = await client.query('SELECT * FROM "Results";')
      res.json(result.rows)
    })

    resolve(app)
  })
}
