import { fetchHTML } from '../scraper/scraper'
import { extractPlayer } from './extract/extractPlayer'
import { DB } from '../db/queries'
import { ScrapingURLs, Tables } from '../shared'
import cron from 'node-cron'

/**
 * Handles the cron job scraping logic
 */
export class CronController {
  static async startPlayers() {
    let playerID = await DB.ID.max(Tables.Players)
    cron.schedule('*/2 * * * * *', () => {
      executePlayerFlow(playerID)
      playerID++
    })
  }
}

// player
const executePlayerFlow = (playerID: number) => {
  const playerURL = ScrapingURLs.Player(playerID)
  fetchHTML(playerURL).then((document: Document) => {
    const player = extractPlayer(document, playerID)
    // console.log(player)
    DB.insert.player(player)
  })
}

// for (let i = 0; i <= 1; i++) {
//   const playerURL = ScrapingURLs.Player(i)
//   fetchHTML(playerURL).then((document) => {
//     const player = extractPlayer(document, i)
//     console.log(player)
//     DB.insert.player(player)
//   })
// }

// team & participations
// const teamID = 51076
// const teamURL = ScrapingURLs.Team(teamID)
// fetchHTML(teamURL).then((document) => {
//   const team = extractTeam(document, teamID)
//   console.log(team)
//   DB.insert.team(team)

//   const participations = extractParticipations(document, teamID)
//   console.log(participations)
//   DB.insert.participations(participations)
// })
