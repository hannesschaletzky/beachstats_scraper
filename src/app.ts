import * as dotenv from 'dotenv'
dotenv.config()
import { CronController } from 'modules/cron/cronController'
import { saveBodyAsFile } from 'scraper/FS'
import { DvvURLs } from 'shared'

console.log(`Scraper started successfully`)

CronController.start()

// eslint-disable-next-line no-constant-condition
if (false) {
  saveBodyAsFile(DvvURLs.Tour_Result(10477), 'TourResult_10477.html')
  saveBodyAsFile(DvvURLs.Player(4846), 'Player_4846.html')
  saveBodyAsFile(DvvURLs.Team(49032), 'Team_49032.html')
}
