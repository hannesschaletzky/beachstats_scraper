import cron from 'node-cron'
import { extractTeam, TeamErrors } from 'modules/extract/extractTeam'
import { DB } from 'db/queries'
import { createDOM, DvvURLs, Tables } from 'shared'
import { scrapeBody } from 'scraper/got-scraping'
import { emitter } from '../emitter'

export const startTeamsFromMaxID = async (interval: string) => {
  let id = 1
  const maxID = await DB.ID.max(Tables.Teams)
  if (maxID != null) {
    id = maxID + 1
  }
  const task = cron.schedule(interval, async () => {
    const result = await scrapeTeam(id)
    if (result == TeamErrors.notFound) {
      emitter.emit('Teams_NotFound')
    } else if (result == TeamErrors.incorrectHTML) {
      // do something
    } else if (result == TeamErrors.insufficientPlayers) {
      // do something
    } else {
      DB.insert.team(result)
    }
    id++
  })
  return task
}

async function scrapeTeam(id: number) {
  console.log(`start team: ${id}`)
  const url = DvvURLs.Team(id)
  const body = await scrapeBody(url)
  const document = createDOM(body)
  return extractTeam(document, id)
}
