import 'dotenv/config'
import { setupExpressServer } from './server/server'
import pool from './db/connectionPool'
import { getParticipationsAndTeamById, getPlayerById } from './scraper/scraper'
import {
  insertParticipations,
  insertPlayer,
  insertTeam
} from './db/insertQueries'

const hostname = process.env.HOSTNAME
const port = process.env.PORT

setupExpressServer().then((server) => {
  server.listen(port, () => {
    console.log(`Server running on ${hostname}:${port}/`)
  })
})

getPlayerById(60060).then((player) => {
  insertPlayer(player)
})
getPlayerById(63301).then((player) => {
  insertPlayer(player)
})

getParticipationsAndTeamById(51076).then((result) => {
  insertTeam(result[0])
  insertParticipations(result[1])
})
