/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { readContentFromFile } from '../../scraper/FS'
import { createDocumentFromBody, Player, Team } from '../../shared'
import { extractPlayer } from './extractPlayer'
import { extractTeam } from './extractTeam'

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
    expect(player.firstName).toBe('Clemens')
  })

  test('lastName set', () => {
    expect(player.lastName).toBe('Wickler')
  })

  test('DVV_ID set', () => {
    expect(player.DVV_ID).toBe(4846)
  })

  test('club set', () => {
    expect(player.club).toBe('ETV Hamburg')
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
