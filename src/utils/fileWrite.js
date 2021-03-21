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

function appendData(filePath, dataToWrite) {
  const formattedData = JSON.stringify(dataToWrite, null, 2)

  fs.readFile(filePath, function (err, data) {
    let result = JSON.parse(data)

    result.answers.push(dataToWrite)

    let extendedData = JSON.stringify(result)

    fs.writeFile(filePath, extendedData, function (err) {
      if (err) throw err
      console.log('The data was appended to file!')
    })
  })
}

module.exports = { readData, writeData, appendData }
