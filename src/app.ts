import 'dotenv/config'
import { setupExpressServer } from './server/server'
import PSQLClient from './db/client'
import { getParticipationsAndTeamFor } from './scraper/scraper'
import { writeParticipations, writeTeam } from './db/queries'

const hostname = process.env.HOSTNAME
const port = process.env.PORT

setupExpressServer().then((server) => {
  server.listen(port, () => {
    console.log(`Server running on ${hostname}:${port}/`)
  })
})

PSQLClient()

getParticipationsAndTeamFor(51076).then((result) => {
  writeTeam(result[0])
  writeParticipations(result[1])
})
