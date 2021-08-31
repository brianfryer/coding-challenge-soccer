const sortTeams = require('./');

test('current team belongs to today', () => {
  const teams = [
    { team: 'A Team', points: 1 },
    { team: 'C Team', points: 5 },
    { team: 'B Team', points: 5 },
    { team: 'D Team', points: 3 },
  ];

  expect(teams.sort(sortTeams)).toStrictEqual([
    { team: 'C Team', points: 5 },
    { team: 'B Team', points: 5 },
    { team: 'D Team', points: 3 },
    { team: 'A Team', points: 1 },
  ]);
});
