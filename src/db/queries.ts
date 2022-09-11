import { Participation, Team } from '../shared/types'
import PSQLClient from './client'

export async function writeParticipations(participations: Participation[]) {
  const client = await PSQLClient()
  participations.forEach(async (part) => {
    const result = await client.query(
      `INSERT INTO "Participations" 
        VALUES (
          ${part.teamID},
          ${part.tournamentID});`
    )
    console.log(result.status)
  })
}

export async function writeTeam(team: Team) {
  const client = await PSQLClient()
  const result = await client.query(
    `INSERT INTO "Teams" 
        VALUES (
          ${team.teamID},
          ${team.Player_1_ID},
          ${team.Player_2_ID});`
  )
  console.log(result.status)
}
