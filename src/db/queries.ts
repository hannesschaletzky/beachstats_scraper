import { Participation, Team } from '../shared/types'
import Pool from './pool'

export async function writeParticipations(participations: Participation[]) {
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
}

export async function writeTeam(team: Team) {
  executeInsert(
    `INSERT INTO "Teams"
        VALUES (
          $1,
          $2,
          $3)`,
    [team.teamID, team.Player_1_ID, team.Player_2_ID]
  )
}

function executeInsert(query: string, values: any) {
  Pool.connect().then((client) => {
    client
      .query(query, values)
      .then((res) => {
        client.release()
        console.log(res.command)
      })
      .catch((err) => {
        client.release()
        console.log(err.stack)
      })
  })
}
