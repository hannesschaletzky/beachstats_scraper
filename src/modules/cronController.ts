// https://github.com/node-cron/node-cron

import { extractPlayer } from './extract/extractPlayer'
import { DB } from '../db/queries'
import { DvvURLs, Tables } from '../shared'
import cron from 'node-cron'
import { scrapeBody } from 'scraper/got-scraping'
import { JSDOM } from 'jsdom'

/**
 * Handles the cron job scraping logic
 */
export class CronController {
  static async startPlayers() {
    let playerID = await DB.ID.max(Tables.Players)
    const job = cron.schedule('*/2 * * * * *', () => {
      scrapeAndSavePlayer(playerID)
      console.log(playerID)
      playerID++
      if (playerID == 30) {
        //TODO: DOES NOT WORK!
        job.stop()
      }
    })
  }
}

// player
const scrapeAndSavePlayer = async (playerID: number) => {
  const url = DvvURLs.Player(playerID)
  const body = await scrapeBody(url)
  const document = new JSDOM(body).window.document
  const player = extractPlayer(document, playerID)
  DB.insert.player(player)
}

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
