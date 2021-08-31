const { POINT_VALUES } = require('./constants');

const calculatePoints = ({ isDraw, position, previousPoints }) => {
  if (isDraw) {
    return POINT_VALUES['draw'] + previousPoints;
  }

  const key = (position === 0) ? 'win' : 'loss';
  return POINT_VALUES[key] + previousPoints;
};

module.exports = calculatePoints;
