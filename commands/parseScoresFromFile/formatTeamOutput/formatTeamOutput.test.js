const formatTeamOutput = require('./');

test('formats team with singluar `pt`', () => {
  const team = 'One Team';
  const points = 1;

  expect(formatTeamOutput({ team, points })).toBe('One Team, 1 pt');
});

test('formats team with pluralized `pts`', () => {
  const team = 'Another Team';
  const points = 2;

  expect(formatTeamOutput({ team, points })).toBe('Another Team, 2 pts');
});
