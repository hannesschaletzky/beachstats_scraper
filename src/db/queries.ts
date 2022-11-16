import { Participation, Player, Team } from 'shared'
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
        [player.playerID, player.firstName, player.lastName, player.club]
      )
    },
    participations(participations: Participation[]) {
      participations.forEach(async (part) => {
        executeInsert(
          `INSERT INTO "Participations"
          ("Team_id", "Tournament_id") 
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
        [team.teamID, team.Player_1_ID, team.Player_2_ID]
      )
    }
  }
}
