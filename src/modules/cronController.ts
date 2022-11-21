/* eslint-disable @typescript-eslint/no-non-null-assertion */

import cron from 'node-cron'
import { extractPlayer } from 'modules/extract/extractPlayer'
import { DB } from 'db/queries'
import { createDOM, DvvURLs, Tables } from 'shared'
import { scrapeBody } from 'scraper/got-scraping'
import { extractTeam } from './extract/extractTeam'

/*
  Stopping jobs might be better done with a cron-manager
  https://www.npmjs.com/package/cron-job-manager
*/

/**
 * Handles the cron job scraping logic with node-cron
 * https://github.com/node-cron/node-cron
 */
export class CronController {
  static async startPlayers() {
    const missingIDs = await DB.ID.missing(Tables.Players)
    let maxID = await DB.ID.max(Tables.Players)
    let id: number
    cron.schedule('*/2 * * * * *', () => {
      // start with all missing ids, continue starting from maxid
      if (missingIDs.length > 0) {
        id = missingIDs.pop()!
      } else {
        maxID++
        id = maxID
      }
      scrapeAndSavePlayer(id)
      console.log(id)
    })
  }
  // static async startTeams() {
  //   let teamID = await DB.ID.max(Tables.Teams)
  //   cron.schedule('*/2 * * * * *', () => {
  //     scrapeAndSaveTeam(teamID)
  //     console.log(teamID)
  //     teamID++
  //   })
  // }
}

const scrapeAndSavePlayer = async (playerID: number) => {
  const url = DvvURLs.Player(playerID)
  const body = await scrapeBody(url)
  const document = createDOM(body)
  const player = extractPlayer(document, playerID)
  DB.insert.player(player)
}

// const scrapeAndSaveTeam = async (teamID: number) => {
//   const url = DvvURLs.Team(teamID)
//   const body = await scrapeBody(url)
//   const document = createDOM(body)
//   const player = extractTeam(document, teamID)
//   DB.insert.team(player)
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
