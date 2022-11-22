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
    // const missingIDs = await DB.ID.missing(Tables.Players)
    const maxID = await DB.ID.max(Tables.Players)
    let id = 1
    if (maxID != null) {
      id = maxID + 1
    }
    cron.schedule('*/2 * * * * *', () => {
      console.log(id)
      scrapeAndSavePlayer(id)
      id++
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
