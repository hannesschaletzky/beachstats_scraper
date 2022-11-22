import { Player, Team, Tables } from 'shared'
import Pool from 'db/pool'

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
        [player.DVV_ID, player.First_Name, player.Last_Name, player.Club]
      )
    },
    // participations(participations: Participation[]) {
    //   participations.forEach(async (part) => {
    //     executeInsert(
    //       `INSERT INTO "Participations"
    //       ("Team_DVV_ID", "Tournament_DVV_ID")
    //         VALUES (
    //           $1,
    //           $2)`,
    //       [part.teamID, part.tournamentID]
    //     )
    //   })
    // },
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
    max(table: Tables): Promise<number | null> {
      return new Promise<number>((resolve, reject) => {
        Pool.connect().then((client) => {
          client
            .query(`SELECT MAX("DVV_ID") FROM public."${table}"`)
            .then((res) => {
              client.release()
              const id = res.rows[0].max
              console.log(`${table} max id: ${id}`)
              resolve(id)
            })
            .catch((err) => {
              client.release()
              console.error(err)
              reject(err)
            })
        })
      })
    },
    missing(table: Tables): Promise<number[]> {
      return new Promise<number[]>((resolve, reject) => {
        Pool.connect().then((client) => {
          client
            .query(
              ` SELECT all_ids AS missing_ids
              FROM generate_series(1, (SELECT MAX("DVV_ID") FROM public."${table}")) all_ids
              EXCEPT 
              SELECT "DVV_ID" FROM public."${table}" ORDER BY "missing_ids"`
            )
            .then((res) => {
              client.release()
              const missing = res.rows.map((a) => a.missing_ids) // extract values
              console.log(`Table ${table}, missing_ids: ${missing}`)
              resolve(missing)
            })
            .catch((err) => {
              client.release()
              console.error(err)
              reject(err)
            })
        })
      })
    }
  }
}
