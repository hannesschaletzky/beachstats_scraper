import { Team } from 'shared'

export enum TeamErrors {
  insufficientPlayers,
  notFound,
  incorrectHTML
}

export function extractTeam(
  document: Document,
  teamID: number
): Team | TeamErrors {
  if (document.body.innerHTML.search('Team nicht gefunden') != -1) {
    console.log('team does not exist')
    return TeamErrors.notFound
  }
  const tables: HTMLTableElement[] = Array.from(
    document.querySelectorAll('table')
  )
  if (tables.length != 4) {
    console.error(`html of team ${teamID} did not contain 4 tables`)
    return TeamErrors.incorrectHTML
  }

  // extract player IDs and save as team
  const team: Team = {
    DVV_ID: teamID,
    Player_1_DVV_ID: -1,
    Player_2_DVV_ID: -1
  }
  const row = tables[2]?.firstChild?.childNodes[3]
  const playerOneID = Number(row?.childNodes[1]?.textContent)
  const playerTwoID = Number(row?.childNodes[2]?.textContent)
  if (isNaN(playerOneID) || isNaN(playerTwoID)) {
    console.log(`team ${teamID} did not consist of two players`)
    return TeamErrors.insufficientPlayers
  }
  team.Player_1_DVV_ID = playerOneID
  team.Player_2_DVV_ID = playerTwoID

  return team
}
