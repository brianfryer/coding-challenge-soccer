const sortTeams = (a, b) => b.points - a.points || a.name < b.name

module.exports = sortTeams;
