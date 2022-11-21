/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { readContentFromFile } from '../../scraper/FS'
import { createDOM, Player, Team, Tour_Result } from '../../shared'
import { extractPlayer } from './extractPlayer'
import { extractTeam } from './extractTeam'
import { extractTourResults } from './extractTourResults'

async function createDOMFromFile(filename: string) {
  const body = await readContentFromFile(filename)
  if (body == undefined) {
    throw Error('Body is undefined')
  }
  return createDOM(body!)
}

describe('extractPlayer should return a correct player object', () => {
  let player: Player
  beforeAll(async () => {
    const id = 4846
    const document = await createDOMFromFile(`Player_${id}.html`)
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
    const document = await createDOMFromFile(`Team_${id}.html`)
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
  const tour_DVV_ID = 10477
  beforeAll(async () => {
    const document = await createDOMFromFile(`TourResult_${tour_DVV_ID}.html`)
    results = extractTourResults(document, tour_DVV_ID)
  })

  test('31 results should be returned', () => {
    expect(results.length).toBe(31)
  })

  test('first item should be first place', () => {
    expect(results[0].Place).toBe(1)
  })

  test('last item should have 0 points', () => {
    expect(results[results.length - 1].Points).toBe(0)
  })

  test('fifth item should have 41353 as team id', () => {
    expect(results[4].Team_DVV_ID).toBe(41353)
  })

  test('result DVV_ID should be tournament id', () => {
    expect(results[0].DVV_ID).toBe(tour_DVV_ID)
  })
})
