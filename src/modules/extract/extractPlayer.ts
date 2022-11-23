import { Player } from 'shared'

export function extractPlayer(
  document: Document,
  playerID: number
): Player | undefined {
  const tables: HTMLTableElement[] = Array.from(
    document.querySelectorAll('table')
  )
  if (tables.length < 5) {
    console.error(`html of player ${playerID} must contain at least 5 tables`)
    return undefined
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
    const firstName = rows[0].childNodes[1].textContent?.trim() || ''
    const lastName = rows[1].childNodes[1].textContent?.trim() || ''
    const club = rows[2].childNodes[1].textContent?.trim() || ''
    const dvv_id = rows[3].childNodes[1].textContent?.trim() || ''
    if (firstName == '' && lastName == '' && dvv_id == '') {
      // -> empty player page
      console.log('found empty player')
      return undefined
    }
    player.Last_Name = firstName
    player.First_Name = lastName
    player.Club = club
  } else {
    throw Error(`table of player ${playerID} did not contain necessary rows`)
  }

  return player
}
