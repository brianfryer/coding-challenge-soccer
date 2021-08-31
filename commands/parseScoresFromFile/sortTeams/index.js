const sortTeams = (a, b) => b.points - a.points || a.team < b.team

module.exports = sortTeams;
