// https://github.com/apify/got-scraping

import { gotScraping } from 'got-scraping'

export function scrapeBody(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    gotScraping
      .get(url)
      .then(({ body }) => resolve(body as string))
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}
