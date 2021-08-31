const sortTeams = (teams) => (
  teams.sort((a, b) => b.points - a.points || a.name < b.name).slice(0, 3)
);

module.exports = sortTeams;
