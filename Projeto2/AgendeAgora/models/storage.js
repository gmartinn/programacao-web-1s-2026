const fs = require('fs');
const path = require('path');

const readData = (filename) => {
    const filePath = path.join(__dirname, filename);
    if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify([]));
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

const writeData = (filename, data) => {
    fs.writeFileSync(path.join(__dirname, filename), JSON.stringify(data, null, 2));
};

module.exports = { readData, writeData };