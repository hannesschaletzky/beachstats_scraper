import cron from 'node-cron'
import { extractPlayer } from 'modules/extract/extractPlayer'
import { DB } from 'db/queries'
import { createDOM, DvvURLs, Tables } from 'shared'
import { scrapeBody } from 'scraper/got-scraping'
import { emitter } from '../emitter'

export const startPlayersFromMaxID = async (interval: string) => {
  let id = 1
  const maxID = await DB.ID.max(Tables.Players)
  if (maxID != null) {
    id = maxID + 1
  }
  const task = cron.schedule(interval, async () => {
    const player = await scrapePlayer(id)
    if (player) {
      DB.insert.player(player)
    } else {
      emitter.emit('Players_EmptyPage')
    }
    id++
  })
  return task
}

export const startPlayersMissingIDs = async (
  interval: string,
  missingIDs: number[]
) => {
  const task = cron.schedule(interval, async () => {
    let id = missingIDs.pop()
    if (id) {
      const player = await scrapePlayer(id)
      if (player) {
        DB.insert.player(player)
      }
      id++
    } else {
      emitter.emit('Players_MissingIDsDone')
    }
  })
  return task
}

async function scrapePlayer(id: number) {
  console.log(`start player: ${id}`)
  const url = DvvURLs.Player(id)
  const body = await scrapeBody(url)
  const document = createDOM(body)
  return extractPlayer(document, id)
}
