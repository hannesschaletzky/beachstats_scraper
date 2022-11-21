import fs from 'fs'
import { scrapeBody } from '../scraper/got-scraping'

const fsPromises = fs.promises

function concatTestingFilesPath(filename: string) {
  return `${__dirname}/testFiles/${filename}`
}

export async function saveBodyAsFile(url: string, filename: string) {
  try {
    const body = await scrapeBody(url)
    const concPath = concatTestingFilesPath(filename)
    fsPromises.writeFile(concPath, body).then(() => {
      console.log(`Saved ${concPath}; file length ${body.length}`)
    })
  } catch (e) {
    console.log(e)
  }
}

export async function readContentFromFile(filename: string) {
  try {
    const concPath = concatTestingFilesPath(filename)
    // Using the filehandle method
    const filehandle = await fsPromises.open(concPath, 'r+')
    const data = await filehandle.readFile('utf8')
    filehandle.close()
    return data
  } catch (e) {
    console.log(e)
  }
}
