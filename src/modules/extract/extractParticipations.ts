import { Participation } from '../../shared'

// team.php?id=41626 -> 41626
function extractNumber(str: string): number {
  return Number(str.replace(/\D/g, ''))
}

export function extractParticipations(
  document: Document,
  teamID: number
): Participation[] {
  const tables: HTMLTableElement[] = Array.from(
    document.querySelectorAll('table')
  )
  if (tables.length != 4) {
    throw Error(`html of team ${teamID} did not contain 4 tables`)
  }

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
    participations.push(part)
  })

  return participations
}
