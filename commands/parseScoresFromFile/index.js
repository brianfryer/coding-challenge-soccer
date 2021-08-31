const fs = require('fs');
const lineByLine = require('n-readlines');
const { EOL } = require('os');
const { find, first } = require('lodash');

const calculatePoints = require('./calculatePoints');
const formatTeam = require('./formatTeam');
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
          if (isNextDay({ currentTeam: name, todaysGames: matchDays[currentDay] })) {
            matchDays.push([]);
            currentDay++;
          }

          const previousGame = find(matchDays[currentDay - 1], (g) => g.name === name);
          const previousPoints = previousGame?.points || 0;
          const points = calculatePoints({ isDraw, position: i, previousPoints });

          matchDays[currentDay].push({ name, points });
        });
      }

      const output = matchDays
        .map((teams, i) => {
          const heading = `Matchday ${i + 1}`;
          const sortedTeams = teams.sort(sortTeams);
          const topTeams = sortedTeams.slice(0, 3);
          const formattedTeams = topTeams.map(formatTeam).join(EOL).concat(EOL);

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
