import { DB } from './queries'
import { Player, Team } from '../shared'
import Pool from './pool'
// import { Pool } from 'pg'

describe('insert queries', () => {
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

  const team: Team = {
    DVV_ID: 1,
    Player_1_DVV_ID: 1,
    Player_2_DVV_ID: 2
  }

  test('it', () => {
    console.log(process.env.PGDATABASE)
    expect(1).toBeTruthy()
  })

  test('player 1 and player 2 were inserted', async () => {
    DB.insert.player(player1)
    setTimeout(() => {
      Pool.connect().then((client) => {
        client
          .query('SELECT "DVV_ID" FROM public."Players"')
          .then((res) => {
            client.release()
            console.log(res.rows)
            expect(res.rows.includes(player1.DVV_ID)).toBeTruthy
          })
          .catch((err) => {
            client.release()
            console.error(err.stack)
          })
      })
    }, 1000)
  })
})
