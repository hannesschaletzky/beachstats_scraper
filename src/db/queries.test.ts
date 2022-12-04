import { DB } from './queries'
import { Player, Team } from '../shared'
import Pool from './pool'

describe('insert queries', () => {
  afterAll(() => {
    Pool.end()
  })

  const player1: Player = {
    DVV_ID: 1,
    First_Name: 'Hanes',
    Last_Name: 'Dieter',
    Club: 'HartAmBall e.V.'
  }
  const player2: Player = {
    DVV_ID: 2,
    First_Name: 'Marlene',
    Last_Name: 'Döner',
    Club: 'TSV Sprungaufschlag'
  }

  const team1: Team = {
    DVV_ID: 1,
    Player_1_DVV_ID: 1,
    Player_2_DVV_ID: 2
  }

  test('player 1 and player 2 were inserted', async () => {
    await DB.insert.player(player1)
    await DB.insert.player(player2)
    const client = await Pool.connect()
    const res = await client.query('SELECT "DVV_ID" FROM public."Players"')
    client.release()
    // console.log(res.rows)
    expect(res.rows[0].DVV_ID).toBe(player1.DVV_ID)
    expect(res.rows[1].DVV_ID).toBe(player2.DVV_ID)
  })

  test('team 1 was inserted', async () => {
    await DB.insert.team(team1)
    const client = await Pool.connect()
    const res = await client.query('SELECT "DVV_ID" FROM public."Teams"')
    client.release()
    // console.log(res.rows)
    expect(res.rows[0].DVV_ID).toBe(team1.DVV_ID)
  })
})
