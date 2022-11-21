/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { readContentFromFile } from '../../scraper/FS'
import { createDocumentFromBody, Player, Team, Tour_Result } from '../../shared'
import { extractPlayer } from './extractPlayer'
import { extractTeam } from './extractTeam'
import { extractTourResults } from './extractTourResults'

async function createDocumentFromFile(filename: string) {
  const body = await readContentFromFile(filename)
  if (body == undefined) {
    throw Error('Body is undefined')
  }
  return createDocumentFromBody(body!)
}

describe('extractPlayer should return a correct player object', () => {
  let player: Player
  beforeAll(async () => {
    const id = 4846
    const document = await createDocumentFromFile(`Player_${id}.html`)
    player = extractPlayer(document, id)
  })

  test('firstName set', () => {
    expect(player.First_Name).toBe('Clemens')
  })

  test('lastName set', () => {
    expect(player.Last_Name).toBe('Wickler')
  })

  test('DVV_ID set', () => {
    expect(player.DVV_ID).toBe(4846)
  })

  test('club set', () => {
    expect(player.Club).toBe('ETV Hamburg')
  })
})

describe('extractTeam should return a correct team object', () => {
  let team: Team
  beforeAll(async () => {
    const id = 49032
    const document = await createDocumentFromFile(`Team_${id}.html`)
    team = extractTeam(document, id)
  })

  test('DVV_ID set', () => {
    expect(team.DVV_ID).toBe(49032)
  })

  test('Player_1_ID set', () => {
    expect(team.Player_1_DVV_ID).toBe(55957)
  })

  test('Player_2_ID set', () => {
    expect(team.Player_2_DVV_ID).toBe(4846)
  })
})

describe('extractTourResults should return an array of correct Tour_Result objects', () => {
  let results: Tour_Result[] = []
  beforeAll(async () => {
    const id = 10477
    const document = await createDocumentFromFile(`TourResult_${id}.html`)
    results = extractTourResults(document, id)
  })

  test('results is not empty', () => {
    expect(results.length).toBeGreaterThan(0)
  })

  // test('result first object', () => {
  //   expect(team.Player_1_DVV_ID).toBe(55957)
  // })
})
