// https://github.com/sindresorhus/got/blob/HEAD/documentation/quick-start.md

import got from 'got'

// const response = await got(url)

export function scrapeBodyGot(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    got(url)
      .then(({ body }) => resolve(body as string))
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}
