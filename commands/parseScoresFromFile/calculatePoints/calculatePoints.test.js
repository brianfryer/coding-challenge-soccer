const calculatePoints = require('./');

test('adds 3 points for a win', () => {
  const isDraw = false;
  const position = 0;
  const previousPoints = 0;

  expect(calculatePoints({ isDraw, position, previousPoints })).toBe(3);
});

test('adds 0 points for a loss', () => {
  const isDraw = false;
  const position = 1;
  const previousPoints = 0;

  expect(calculatePoints({ isDraw, position, previousPoints })).toBe(0);
});

test('adds 1 point for a draw', () => {
  const isDraw = true;
  const position = 0;
  const previousPoints = 0;

  expect(calculatePoints({ isDraw, position, previousPoints })).toBe(1);
});

test('adds 3 points for a win to 3 points from previous games', () => {
  const isDraw = false;
  const position = 0;
  const previousPoints = 3;

  expect(calculatePoints({ isDraw, position, previousPoints })).toBe(6);
});
