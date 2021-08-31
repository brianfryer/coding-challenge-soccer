// if todays games already has the current team,
// it's the next day!
const isNextDay = ({ todaysGames, currentTeam }) => (
  todaysGames.some(({ name }) => name === currentTeam)
);

module.exports = isNextDay;
