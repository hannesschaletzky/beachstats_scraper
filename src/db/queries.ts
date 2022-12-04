import { Player, Team, Tables } from 'shared'
import Pool from './pool'

async function executeInsert(query: string, values: (string | number)[]) {
  try {
    const client = await Pool.connect()
    const res = await client.query(query, values)
    console.log(`${res.command} of ${values}`)
    client.release()
  } catch (err) {
    console.log(err)
  }
}

export class DB {
  static insert = {
    player(player: Player) {
      return executeInsert(
        `INSERT INTO "Players"
        VALUES (
          $1,
          $2,
          $3,
          $4)`,
        [player.DVV_ID, player.First_Name, player.Last_Name, player.Club]
      )
    },
    team(team: Team) {
      return executeInsert(
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
