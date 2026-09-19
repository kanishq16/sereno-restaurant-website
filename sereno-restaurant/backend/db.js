const fs = require("fs");
const path = require("path");

function filePath(name) {
  return path.join(__dirname, "data", `${name}.json`);
}

function readData(name) {
  const raw = fs.readFileSync(filePath(name), "utf-8");
  return JSON.parse(raw || "[]");
}

function writeData(name, data) {
  fs.writeFileSync(filePath(name), JSON.stringify(data, null, 2), "utf-8");
}

module.exports = { readData, writeData };
