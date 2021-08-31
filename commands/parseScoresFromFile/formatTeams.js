const pluralize = require('pluralize');
const { EOL } = require('os');

const format = ({ name, points }) => `${name}, ${points} ${pluralize('pt', points)}`;
const formatTeams = (teams) => teams.map(format).join(EOL).concat(EOL);

module.exports = formatTeams;
