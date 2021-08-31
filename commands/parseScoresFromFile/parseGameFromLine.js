const { SCORE_SEPARATOR, TEAM_SEPARATOR } = require('./constants');

const getScoreSeparatorIndex = (s) => s.lastIndexOf(SCORE_SEPARATOR);

const parseTeam = (str) => {
  const scoreSeparatorIndex = getScoreSeparatorIndex(str);
  const name = str.slice(0, scoreSeparatorIndex).trim();
  const score = Number(str.slice(scoreSeparatorIndex).trim());
  return { name, score };
};

const parseGameFromLine = (line) => (
  line
    .toString()
    .split(TEAM_SEPARATOR)
    .map(parseTeam)
    .sort((a, b) => (a.score < b.score) ? 1 : -1) // place winning team in 1st position
);

module.exports = parseGameFromLine;
