import 'dotenv/config'
import { setupExpressServer } from './server/server'
import { CronController } from 'modules/cronController'
import { readContentFromFile, saveBodyAsFile } from 'scraper/FS'
import { DvvURLs } from 'shared'

const hostname = process.env.HOSTNAME
const port = process.env.PORT

setupExpressServer().then((server) => {
  server.listen(port, () => {
    console.log(`Server running on ${hostname}:${port}/`)
  })
})

// CronController.startPlayers()

// saveBodyAsFile(DvvURLs.Tour_Result(11056), 'TourResult_11056.html')
// saveBodyAsFile(DvvURLs.Player(4846), 'Player_4846.html')
// saveBodyAsFile(DvvURLs.Team(49032), 'Team_49032.html')

// readContentFromFile('Tour_Result.html').then((content) => {
//   console.log(content?.length)
// })
