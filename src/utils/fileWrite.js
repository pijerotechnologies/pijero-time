const fs = require('fs')

async function readData(file) {
  const data = await fs.readFileSync(file)

  const formattedData = JSON.parse(data)

  return formattedData
}

function writeData(filePath, data) {
  return new Promise(async (resolve) => {
    const formattedData = JSON.stringify(data, null, 2)
    await fs.writeFile(filePath, formattedData, complete)

    function complete(error) {
      error && console.error(error)
      resolve('data write complete')
    }
  })
}

module.exports = { readData, writeData }
