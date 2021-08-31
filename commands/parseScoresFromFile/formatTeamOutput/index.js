const pluralize = require('pluralize');

const formatTeamOutput = ({ team, points }) => `${team}, ${points} ${pluralize('pt', points)}`;

module.exports = formatTeamOutput;
