import 'dotenv/config'
import { setupExpressServer } from 'server/server'
import { fetchHTML } from 'scraper/scraper'
import { extractPlayer } from 'modules/extractPlayer'
import { DB } from 'db/queries'
import { ScrapingURLs } from 'shared'
import { extractTeam } from 'modules/extractTeam'
import { extractParticipations } from 'modules/extractParticipations'

import { JSDOM } from 'jsdom'

import fs from 'fs'
import { doc } from 'prettier'
const fsPromises = fs.promises

// async function doReadFile() {
//   try {
//     // Using the filehandle method
//     const filehandle = await fsPromises.open(
//       `${__dirname}/scraper/testFiles/Player.html`,
//       'r+'
//     )
//     const data = await filehandle.readFile('utf8')
//     filehandle.close()
//     console.log(data.length)

//     const dom = new JSDOM(data)
//     const document = dom.window.document
//     console.log(document.querySelectorAll('table').length)

//     const player = extractPlayer(document, 2)
//     console.log(player)
//   } catch (e) {
//     console.log('Error', e)
//   }
// }

// doReadFile()

const hostname = process.env.HOSTNAME
const port = process.env.PORT

setupExpressServer().then((server) => {
  server.listen(port, () => {
    console.log(`Server running on ${hostname}:${port}/`)
  })
})

// player
// const playerID = 60060
// const playerURL = ScrapingURLs.Player(playerID)
// fetchHTML(playerURL).then((document) => {
//   const player = extractPlayer(document, playerID)
//   console.log(player)
//   DB.insert.player(player)
// })

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
