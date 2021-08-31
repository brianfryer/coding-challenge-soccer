const fs = require('fs');
const readline = require('readline');

const parseLinesFromFile = async (pathToFile) => {
  const fileStream = fs.createReadStream(pathToFile);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  const lines = [];

  for await (const line of rl) {
    lines.push(line);
  }

  return lines;
};

module.exports = parseLinesFromFile;
