const { SCORE_SEPARATOR, TEAM_SEPARATOR } = require('./constants');

const getScoreSeparatorIndex = (s) => s.lastIndexOf(SCORE_SEPARATOR);

const parseNameAndScore = (str) => {
  const scoreSeparatorIndex = getScoreSeparatorIndex(str);
  const name = str.slice(0, scoreSeparatorIndex).trim();
  const score = Number(str.slice(scoreSeparatorIndex).trim());

  return { name, score };
};

const parseGameFromLine = (line) => (
  line
    .toString()
    .split(TEAM_SEPARATOR)
    .map(parseNameAndScore)
    .sort((a, b) => b.score - a.score) // place winning team in 1st position
);

module.exports = parseGameFromLine;
