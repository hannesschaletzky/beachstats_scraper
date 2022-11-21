import { rejects } from 'assert'
import { isMissingDeclaration } from 'typescript'
import { Participation, Player, Team, Tables } from '../shared'
import Pool from './pool'

function executeInsert(query: string, values: (string | number)[]) {
  Pool.connect().then((client) => {
    client
      .query(query, values)
      .then((res) => {
        client.release()
        console.log(res.command)
      })
      .catch((err) => {
        client.release()
        console.error(err.stack)
      })
  })
}

export class DB {
  static insert = {
    player(player: Player) {
      executeInsert(
        `INSERT INTO "Players"
        VALUES (
          $1,
          $2,
          $3,
          $4)`,
        [player.DVV_ID, player.firstName, player.lastName, player.club]
      )
    },
    participations(participations: Participation[]) {
      participations.forEach(async (part) => {
        executeInsert(
          `INSERT INTO "Participations"
          ("Team_DVV_ID", "Tournament_DVV_ID") 
            VALUES (
              $1,
              $2)`,
          [part.teamID, part.tournamentID]
        )
      })
    },
    team(team: Team) {
      executeInsert(
        `INSERT INTO "Teams"
        VALUES (
          $1,
          $2,
          $3)`,
        [team.DVV_ID, team.Player_1_DVV_ID, team.Player_2_DVV_ID]
      )
    }
  }
  static ID = {
    max(table: Tables): Promise<number> {
      return new Promise<number>((resolve, reject) => {
        Pool.connect().then((client) => {
          client
            .query(`SELECT MAX("DVV_ID") FROM public."${table}"`)
            .then((res) => {
              client.release()
              let id = res.rows[0].max
              console.log(`${table} max id: ${id}`)
              if (id == null) {
                console.log('starting at 1')
                id = 1
              }
              resolve(id)
            })
            .catch((err) => {
              client.release()
              console.error(err.stack)
              reject(-1)
            })
        })
      })
    },
    missing(table: Tables) {
      Pool.connect().then((client) => {
        client
          .query(
            ` SELECT all_ids AS missing_ids
              FROM generate_series((SELECT MIN("DVV_ID") FROM public."${table}"), (SELECT MAX("DVV_ID") FROM public."${table}")) all_ids
              EXCEPT 
              SELECT "DVV_ID" FROM public."${table}" ORDER BY "missing_ids"`
          )
          .then((res) => {
            client.release()
            console.log('missing ids:' + res.rows)
          })
          .catch((err) => {
            client.release()
            console.error(err.stack)
          })
      })
    }
  }
}
