import { JSDOM } from 'jsdom'
import fetch from 'node-fetch'
import { Participation, Team, Player } from '../shared/types'

async function fetchHTML(url: string) {
  const response = await fetch(url)
  const body = await response.text()
  return body
}

function createDomDocument(HTMLData: string) {
  const dom = new JSDOM(HTMLData)
  return dom.window.document
}

// team.php?id=41626 -> 41626
function extractNumber(str: string): number {
  return Number(str.replace(/\D/g, ''))
}

export async function getParticipationsAndTeamById(
  teamID: number
): Promise<[Team, Participation[]]> {
  const url = `${process.env.BEACH_URL}/team.php?id=${teamID}`
  const body = await fetchHTML(url)
  const document = createDomDocument(body)

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
    return [team, []]
  }
  team.Player_1_ID = playerOneID
  team.Player_2_ID = playerTwoID

  // access each row in table body
  const participations: Participation[] = []
  const resultTable = tables[3].firstChild
  resultTable?.childNodes.forEach((row, i) => {
    if (i == 0) {
      return // skip headline
    }
    const cells = row.childNodes
    // continue if "Senioren points" are displayed as empty row
    if (cells.length < 4) {
      return
    }
    const tournamentAnchor = cells[1].childNodes[0] as HTMLAnchorElement
    const tournamentID = extractNumber(tournamentAnchor.href)
    const part: Participation = {
      teamID: teamID,
      tournamentID: tournamentID
    }
    console.log(part)
    participations.push(part)
  })

  return [team, participations]
}

export async function getPlayerById(playerID: number): Promise<Player> {
  const url = `${process.env.BEACH_URL}/spieler.php?id=${playerID}`
  const body = await fetchHTML(url)
  const document = createDomDocument(body)

  const tables: HTMLTableElement[] = Array.from(
    document.querySelectorAll('table')
  )
  if (tables.length < 5) {
    throw Error(`html of player ${playerID} must contain at least 5 tables`)
  }

  // extract player information and save as player
  const player: Player = {
    playerID: playerID,
    firstName: '',
    lastName: '',
    club: ''
  }

  const rows = tables[4]?.firstChild?.childNodes
  if (rows && rows.length >= 3) {
    player.lastName = rows[0].childNodes[1].textContent?.trim() || ''
    player.firstName = rows[1].childNodes[1].textContent?.trim() || ''
    player.club = rows[2].childNodes[1].textContent?.trim() || ''
  } else {
    throw Error(`table of player ${playerID} did not contain necessary rows`)
  }

  return player
}
