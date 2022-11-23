import cron from 'node-cron'
import { emitter } from './emitter'
import * as Jobs from './cronJobs'
import { DB } from 'db/queries'
import { Tables } from 'shared'

export enum Jobname {
  Players_Missing = 'Players_Missing',
  Players_Regular = 'Players_Regular'
}

const interval = '*/2 * * * * *'

export class CronController {
  static runningJobs: { name: Jobname; task: cron.ScheduledTask }[] = []
  private static players_emptyPageCounter: number

  private static deleteJob(name: Jobname) {
    let index = -1
    const job = this.runningJobs.find((job, i) => {
      index = i
      return job.name == name
    })
    if (job) {
      job.task.stop()
      CronController.runningJobs.splice(index, 1)
      console.log(`deleted job ${job.name}`)
    }
    throw Error(`Did not find job for ${name}`)
  }

  private static addJob(name: Jobname, task: cron.ScheduledTask) {
    CronController.runningJobs.push({
      name: name,
      task: task
    })
  }

  /**
   * Players job executor
   */
  static async startPlayersFlow() {
    // job order
    const jobs: { name: Jobname; exec: () => void }[] = [
      {
        name: Jobname.Players_Missing,
        exec: () => {
          CronController.Players.Start.Missing()
        }
      },
      {
        name: Jobname.Players_Regular,
        exec: () => {
          CronController.Players.Start.Regular()
        }
      }
    ]

    emitter.on('Players_nextJob', (currentName) => {
      const newJob = jobs.shift()
      if (newJob) {
        console.log(`starting job: ${newJob.name}`)
        newJob.exec()
      } else {
        console.log('players finished!')
      }
      if (currentName) {
        // on first run, there is no current job
        this.deleteJob(currentName)
      }
    })

    emitter.emit('Players_nextJob', null)
  }

  private static Players = {
    Start: {
      async Missing() {
        emitter.on('Players_MissingIDsDone', () => {
          emitter.removeAllListeners('Players_MissingIDsDone')
          emitter.emit('Players_nextJob', Jobname.Players_Missing)
        })
        const missingIDs = await DB.ID.missing(Tables.Players)
        Jobs.startPlayersMissingIDs(interval, missingIDs).then((task) => {
          CronController.addJob(Jobname.Players_Missing, task)
        })
      },
      Regular() {
        CronController.players_emptyPageCounter = 0
        emitter.on('Players_EmptyPage', () => {
          CronController.players_emptyPageCounter++
          if (CronController.players_emptyPageCounter >= 3) {
            console.log('three empty pages in a row, stopping job')
            emitter.removeAllListeners('Players_EmptyPage')
            emitter.emit('Players_nextJob', Jobname.Players_Regular)
          }
        })
        Jobs.startPlayers(interval).then((task) => {
          CronController.addJob(Jobname.Players_Regular, task)
        })
      }
    }
  }
}
