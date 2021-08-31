const { find } = require('lodash');
const { POINT_VALUES, TEAM_SEPARATOR } = require('./constants');

const calculatePoints = ({ yesterdaysGames, currentTeam, index, isDraw }) => {
  const previousGame = find(yesterdaysGames, ({ name }) => name === currentTeam);
  const previousPoints = previousGame?.points || 0;
  const position = (index === 0) ? 'win' : 'loss';
  const result = (isDraw) ? 'draw' : position;

  return POINT_VALUES[result] + previousPoints;
};

module.exports = calculatePoints;
