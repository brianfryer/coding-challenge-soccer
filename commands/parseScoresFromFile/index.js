const fs = require('fs');
const lineByLine = require('n-readlines');
const { EOL } = require('os');
const { find } = require('lodash');

const formatTeams = require('./formatTeams');
const parseGameFromLine = require('./parseGameFromLine');
const sortTeams = require('./sortTeams');
const { POINT_VALUES, TEAM_SEPARATOR } = require('./constants');

const parseSoccerScoresFromFile = (_, { args }) => {
  try {
    if (args[0] && fs.existsSync(args[0])) {
      const matchDays = [[]];
      let current = 0;

      const liner = new lineByLine(args[0]);
      let line;

      while (line = liner.next()) {
        const [a, b] = parseGameFromLine(line);
        const isDraw = ((n) => n === 0)(a.score - b.score);

        [a, b].forEach(({ name }, i) => {
          // if the current day already has an
          // entry for this team, we're onto a
          // new matchday
          if (matchDays[current].some((g) => g.name === name)) {
            matchDays.push([]);
            current++;
          }

          // add up points, including points
          // from previous games.
          const previousGame = find(matchDays[current - 1], (g) => g.name === name);
          const previousPoints = previousGame?.points || 0;
          const position = (i === 0) ? 'win' : 'loss'; // first position = 'win'
          const result = (isDraw) ? 'draw' : position;
          const points = POINT_VALUES[result] + previousPoints;

          matchDays[current].push({ name, points });
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
