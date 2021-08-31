const { SCORE_DELIMETER, TEAM_DELIMETER } = require('../constants');

const getScoreDelimeterIndex = (s) => s.lastIndexOf(SCORE_DELIMETER);

const parseTeamAndScore = (str) => {
  const scoreDelimeterIndex = getScoreDelimeterIndex(str);
  const team = str.slice(0, scoreDelimeterIndex).trim();
  const score = Number(str.slice(scoreDelimeterIndex).trim());

  return { team, score };
};

const parseGameFromLine = (line) => {
  const [a, b] = line
    .toString()
    .split(TEAM_DELIMETER)
    .map(parseTeamAndScore)
    .sort((a, b) => b.score - a.score) // place winning team in 1st position
  const teams = [a, b].map(({ team }) => team);
  const isDraw = ((n) => n === 0)(a.score - b.score);

  return { teams, isDraw };
};

module.exports = parseGameFromLine;
