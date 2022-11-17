import 'dotenv/config'
import { setupExpressServer } from './server/server'
import { CronController } from 'modules/cronController'

import { fetchHTML } from './scraper/scraper'
import { extractPlayer } from './modules/extract/extractPlayer'
import { DB } from './db/queries'
import { ScrapingURLs, Tables } from './shared'
import { extractTeam } from './modules/extract/extractTeam'
import { extractParticipations } from './modules/extract/extractParticipations'
import { JSDOM } from 'jsdom'

// import fs from 'fs'
// const fsPromises = fs.promises
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

// CronController.startPlayers()
