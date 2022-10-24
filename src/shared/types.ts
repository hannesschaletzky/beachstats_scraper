export interface Participation {
  teamID: number
  tournamentID: number
}

export interface Team {
  teamID: number
  Player_1_ID: number
  Player_2_ID: number
}

export interface Player {
  playerID: number
  firstName: string
  lastName: string
  club: string
}
