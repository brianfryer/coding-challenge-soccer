const fs = require('fs');
const { EOL } = require('os');
const { find, first } = require('lodash');

const calculatePoints = require('./calculatePoints');
const formatTeamOutput = require('./formatTeamOutput');
const isNextDay = require('./isNextDay');
const parseGameFromLine = require('./parseGameFromLine');
const parseLinesFromFile = require('./parseLinesFromFile');
const sortTeams = require('./sortTeams');

const parseSoccerScoresFromFile = async (_, { args }) => {
  const pathToFile = first(args);

  if (pathToFile && fs.existsSync(pathToFile)) {
    const lines = await parseLinesFromFile(pathToFile);
    const games = lines.map(parseGameFromLine);
    const matchDays = [];
    let currentDay = 0;

    games.forEach(({ teams, isDraw }) => {
      teams.forEach((team, i) => {

        if (isNextDay({ currentTeam: team, todaysGames: matchDays[currentDay] })) {
          currentDay++;
        }

        if (!matchDays[currentDay]) {
          matchDays.push([]);
        }

        const previousGame = find(matchDays[currentDay - 1], (g) => g.team === team);
        const previousPoints = previousGame?.points || 0;
        const points = calculatePoints({ isDraw, position: i, previousPoints });

        matchDays[currentDay].push({ team, points });
      });
    });

    const output = matchDays
      .map((teams, i) => {
        const heading = `Matchday ${i + 1}`;
        const topTeams = teams
          .sort(sortTeams)
          .slice(0, 3)
          .map(formatTeamOutput)
          .join(EOL)
          .concat(EOL);

        return [heading, topTeams].join(EOL);
      })
      .join(EOL);

    process.stdout.write(output);
  }
};

module.exports = parseSoccerScoresFromFile;
