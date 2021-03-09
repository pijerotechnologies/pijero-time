const fs = require("fs");

async function readData(file) {
    const data = await fs.readFileSync(file);
    const formattedData = JSON.parse(data);

    return formattedData;
}

const writeData = (filePath, data) => {
    const formattedData = JSON.stringify(data);
    fs.writeFile(filePath, formattedData, callback);

    function callback(err) {
        console.log(err);
    }
};

module.exports = { readData, writeData };
