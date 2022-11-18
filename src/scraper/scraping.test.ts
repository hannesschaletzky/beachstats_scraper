// import main from './scraper/crawlee'

// import fs from 'fs'
// const fsPromises = fs.promises
// async function doReadFile() {
//   try {
//     // Using the filehandle method
//     const filehandle = await fsPromises.open(
//       `${__dirname}/scraper/testFiles/Player.html`,
//       'r+'
//     )
//     const data = await filehandle.readFile('utf8')
//     filehandle.close()
//     console.log(data.length)

//     const dom = new JSDOM(data)
//     const document = dom.window.document
//     console.log(document.querySelectorAll('table').length)

//     const player = extractPlayer(document, 2)
//     console.log(player)
//   } catch (e) {
//     console.log('Error', e)
//   }
// }

// doReadFile()
