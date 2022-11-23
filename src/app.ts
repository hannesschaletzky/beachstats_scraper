import * as dotenv from 'dotenv'
dotenv.config()
import { setupExpressServer } from 'server/server'
import { CronController } from 'modules/cron/cronController'
import { saveBodyAsFile } from 'scraper/FS'
import { DvvURLs, Tables } from 'shared'
import { DB } from 'db/queries'

const hostname = process.env.HOSTNAME
const port = process.env.PORT

setupExpressServer().then((server) => {
  server.listen(port, () => {
    console.log(`Server running on ${hostname}:${port}/`)
  })
})

// CronController.startPlayersFlow()

// DB.ID.missing(Tables.Players).then((val) => {
//   console.log(val)
// })

// eslint-disable-next-line no-constant-condition
if (false) {
  saveBodyAsFile(DvvURLs.Tour_Result(10477), 'TourResult_10477.html')
  saveBodyAsFile(DvvURLs.Player(4846), 'Player_4846.html')
  saveBodyAsFile(DvvURLs.Team(49032), 'Team_49032.html')
}
