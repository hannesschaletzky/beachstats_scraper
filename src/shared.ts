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

/**
 * Holds constructed URLs of scraping scenarios
 */
export class ScrapingURLs {
  private static base = process.env.BEACH_URL

  /**
   * Returns https://beach.volleyball-verband.de/public/spieler.php?id={id} with given id as query parameter
   *
   * @id number
   */
  static Player(id: number) {
    return `${ScrapingURLs.base}/spieler.php?id=${id}`
  }

  static Team(id: number) {
    return `${ScrapingURLs.base}/team.php?id=${id}`
  }
}
