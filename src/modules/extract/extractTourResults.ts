import { Tour_Result } from 'shared'

// "team.php?id=41626" -> 41626
function extractNumber(str: string): number {
  return Number(str.replace(/\D/g, ''))
}

export function extractTourResults(
  document: Document,
  tourID: number
): Tour_Result[] {
  const tables: HTMLTableElement[] = Array.from(
    document.querySelectorAll('table')
  )
  if (tables.length != 5) {
    throw Error(`html of tour_result ${tourID} did not contain 5 tables`)
  }

  const results: Tour_Result[] = []
  const rows = tables[4].querySelectorAll('tr:not(.bez)')
  rows?.forEach((row) => {
    const cells = row.childNodes

    // ranking / place
    const place = Number(cells[0].textContent)

    // team dvv id
    const teamAnchor = cells[1].childNodes[0] as HTMLAnchorElement
    const teamID = extractNumber(teamAnchor.href)

    // points
    let points = 0
    if (cells[3] != undefined) {
      points = Number(cells[3].textContent)
    }

    const result: Tour_Result = {
      DVV_ID: tourID,
      Place: place,
      Team_DVV_ID: teamID,
      Points: points
    }
    results.push(result)
  })

  return results
}
