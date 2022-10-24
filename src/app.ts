import 'dotenv/config'
import { setupExpressServer } from './server/server'
import { fetchHTML } from './scraper/scraper'
import { extractPlayer } from './modules/extractPlayer'
import { DB } from './db/queries'
import { ScrapingURLs } from './shared'
import { extractTeam } from './modules/extractTeam'
import { extractParticipations } from './modules/extractParticipations'

const hostname = process.env.HOSTNAME
const port = process.env.PORT

setupExpressServer().then((server) => {
  server.listen(port, () => {
    console.log(`Server running on ${hostname}:${port}/`)
  })
})

// player
const playerID = 60060
const playerURL = ScrapingURLs.Player(playerID)
fetchHTML(playerURL).then((document) => {
  const player = extractPlayer(document, playerID)
  console.log(player)
  DB.insert.player(player)
})

// team & participations
const teamID = 51076
const teamURL = ScrapingURLs.Team(teamID)
fetchHTML(teamURL).then((document) => {
  const team = extractTeam(document, teamID)
  console.log(team)
  DB.insert.team(team)

  const participations = extractParticipations(document, teamID)
  console.log(participations)
  DB.insert.participations(participations)
})
