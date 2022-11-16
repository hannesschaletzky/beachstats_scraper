import { Team } from '../shared'

export function extractTeam(document: Document, teamID: number): Team {
  const tables: HTMLTableElement[] = Array.from(
    document.querySelectorAll('table')
  )
  if (tables.length != 4) {
    throw Error(`html of team ${teamID} did not contain 4 tables`)
  }

  // extract player IDs and save as team
  const team: Team = {
    teamID: teamID,
    Player_1_ID: -1,
    Player_2_ID: -1
  }
  const row = tables[2]?.firstChild?.childNodes[3]
  const playerOneID = Number(row?.childNodes[1]?.textContent)
  const playerTwoID = Number(row?.childNodes[2]?.textContent)
  if (isNaN(playerOneID) || isNaN(playerTwoID)) {
    console.log(`team ${teamID} did not consist of two players`)
    return team
  }
  team.Player_1_ID = playerOneID
  team.Player_2_ID = playerTwoID

  return team
}
