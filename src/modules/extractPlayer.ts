import { Player } from '../shared'

// const url = `${process.env.BEACH_URL}/spieler.php?id=${playerID}`

export function extractPlayer(document: Document, playerID: number): Player {
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
