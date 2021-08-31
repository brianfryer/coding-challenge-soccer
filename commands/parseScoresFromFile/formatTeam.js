const pluralize = require('pluralize');

const formatTeam = ({ name, points }) => `${name}, ${points} ${pluralize('pt', points)}`;

module.exports = formatTeam;
