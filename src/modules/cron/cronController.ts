import cron from 'node-cron'
import { emitter } from './emitter'
import * as JobsPlayers from './jobs/jobsPlayers'
import * as JobsTeams from './jobs/jobsTeams'
import { DB } from 'db/queries'
import { Tables } from 'shared'

export enum Jobname {
  Players_Missing = 'Players_Missing',
  Players_Regular = 'Players_Regular',
  Teams_Regular = 'Teams_Regular'
}

const interval = '*/2 * * * * *'

export class CronController {
  // general methods / vars for cron job controlling
  private static runningJobs: { name: Jobname; task: cron.ScheduledTask }[] = []

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
    this.runningJobs.push({
      name: name,
      task: task
    })
  }

  // module specific
  private static players_emptyPageCounter: number

  private static players_maxEmptyPage = 3

  /**
   * Job executor
   */
  static async start() {
    // job order
    const jobs: { name: Jobname; exec: () => void }[] = [
      // {
      //   name: Jobname.Players_Missing,
      //   exec: () => {
      //     this.Players.Start.Missing()
      //   }
      // },
      // {
      //   name: Jobname.Players_Regular,
      //   exec: () => {
      //     this.Players.Start.Regular()
      //   }
      // },
      {
        name: Jobname.Teams_Regular,
        exec: () => {
          this.Teams.Start.Regular()
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
        JobsPlayers.startPlayersMissingIDs(interval, missingIDs).then(
          (task) => {
            CronController.addJob(Jobname.Players_Missing, task)
          }
        )
      },
      Regular() {
        CronController.players_emptyPageCounter = 0
        emitter.on('Players_EmptyPage', () => {
          CronController.players_emptyPageCounter++
          if (
            CronController.players_emptyPageCounter >=
            CronController.players_maxEmptyPage
          ) {
            console.log(
              `${CronController.players_maxEmptyPage} empty pages in a row, stopping job`
            )
            emitter.removeAllListeners('Players_EmptyPage')
            emitter.emit('Players_nextJob', Jobname.Players_Regular)
          }
        })
        JobsPlayers.startPlayersFromMaxID(interval).then((task) => {
          CronController.addJob(Jobname.Players_Regular, task)
        })
      }
    }
  }

  private static Teams = {
    Start: {
      Regular() {
        emitter.on('Teams_NotFound', () => {
          emitter.removeAllListeners('Teams_NotFound')
          emitter.emit('Players_nextJob', Jobname.Teams_Regular)
        })
        JobsTeams.startTeamsFromMaxID(interval).then((task) => {
          CronController.addJob(Jobname.Teams_Regular, task)
        })
      }
    }
  }
}
