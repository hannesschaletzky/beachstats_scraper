import { JSDOM } from 'jsdom'

export interface Participation {
  teamID: number
  tournamentID: number
}

export interface Team {
  DVV_ID: number
  Player_1_DVV_ID: number
  Player_2_DVV_ID: number
}

export interface Player {
  DVV_ID: number
  firstName: string
  lastName: string
  club: string
}

/**
 * Database Table names
 */
export enum Tables {
  Players = 'Players',
  Teams = 'Teams',
  Participations = 'Participations'
}

export function createDocumentFromBody(body: string) {
  return new JSDOM(body).window.document
}

/**
 * Holds constructed URLs of scraping scenarios
 */
export class DvvURLs {
  private static base = process.env.BEACH_URL

  /**
   * Returns https://beach.volleyball-verband.de/public/spieler.php?id={id} with given id as query parameter
   *
   * @id number
   */
  static Player(id: number) {
    return `${DvvURLs.base}/spieler.php?id=${id}`
  }

  static Team(id: number) {
    return `${DvvURLs.base}/team.php?id=${id}`
  }

  static Tour_Result(id: number) {
    return `${DvvURLs.base}/tur-er.php?id=${id}`
  }
}
