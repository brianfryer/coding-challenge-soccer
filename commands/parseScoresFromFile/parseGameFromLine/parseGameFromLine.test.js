const parseGameFromLine = require('./');

test('parse game as a draw', () => {
  const line = 'This Team 3, That Team 2';

  expect(parseGameFromLine(line)).toStrictEqual({
    teams: ['This Team', 'That Team'],
    isDraw: false,
  });
});

test('parse game with a win/loss', () => {
  const line = 'This Team 2, That Team 2';

  expect(parseGameFromLine(line)).toStrictEqual({
    teams: ['This Team', 'That Team'],
    isDraw: true,
  });
});
