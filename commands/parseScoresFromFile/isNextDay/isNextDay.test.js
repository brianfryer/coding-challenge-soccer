const isNextDay = require('./');

test('current team belongs to today', () => {
  const currentTeam = 'This Team';
  const todaysGames = [];

  expect(isNextDay({ currentTeam, todaysGames })).toBe(false);
});

test('current team belongs to next day', () => {
  const currentTeam = 'That Team';
  const todaysGames = [{
    team: 'That Team',
    points: 0,
  }];

  expect(isNextDay({ currentTeam, todaysGames })).toBe(true);
});
