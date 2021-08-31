const fs = require('fs');
const lineByLine = require('n-readlines');
const { EOL } = require('os');
const { first } = require('lodash');

const calculatePoints = require('./calculatePoints');
const formatTeams = require('./formatTeams');
const isNextDay = require('./isNextDay');
const parseGameFromLine = require('./parseGameFromLine');
const sortTeams = require('./sortTeams');

const parseSoccerScoresFromFile = (_, { args }) => {
  try {
    const pathToFile = first(args);

    if (pathToFile && fs.existsSync(pathToFile)) {
      const liner = new lineByLine(pathToFile);
      const matchDays = [[]];
      let currentDay = 0;
      let line;

      while (line = liner.next()) {
        const [a, b] = parseGameFromLine(line);
        const isDraw = ((n) => n === 0)(a.score - b.score);

        [a, b].forEach(({ name }, i) => {
          const todaysGames = matchDays[currentDay];

          if (isNextDay({ todaysGames, currentTeam: name })) {
            matchDays.push([]);
            currentDay++;
          }

          const yesterdaysGames = matchDays[currentDay - 1];

          const points = calculatePoints({
            yesterdaysGames,
            currentTeam: name,
            index: i,
            isDraw,
          });

          matchDays[currentDay].push({ name, points });
        });
      }

      const output = matchDays
        .map((teams, i) => {
          const heading = `Matchday ${i + 1}`;
          const sortedTeams = sortTeams(teams);
          const formattedTeams = formatTeams(sortedTeams);

          return [heading, formattedTeams].join(EOL);
        })
        .join(EOL);

      console.log(output);
    }
  } catch(err) {
    console.error(err)
  }
};

module.exports = parseSoccerScoresFromFile;
