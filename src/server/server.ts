import express from 'express'
import PSQLClient from '../db/connectionPool'

export const setupExpressServer = () => {
  return new Promise<express.Express>((resolve) => {
    const app = express()
    app.get('/', (req, res) => {
      res.json('Hello World!')
    })

    resolve(app)
  })
}
