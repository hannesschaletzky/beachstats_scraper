import { Player } from 'shared'

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
    DVV_ID: playerID,
    First_Name: '',
    Last_Name: '',
    Club: ''
  }

  const rows = tables[4]?.firstChild?.childNodes
  if (rows && rows.length >= 3) {
    player.Last_Name = rows[0].childNodes[1].textContent?.trim() || ''
    player.First_Name = rows[1].childNodes[1].textContent?.trim() || ''
    player.Club = rows[2].childNodes[1].textContent?.trim() || ''
  } else {
    throw Error(`table of player ${playerID} did not contain necessary rows`)
  }

  return player
}
