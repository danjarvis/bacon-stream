var test = require('tap').test
  , bacon = require('..');

test('require', function(t) {
  t.ok(bacon, 'has bacon');
  t.type(bacon, 'function', 'bacon has object');
  t.equal(1, bacon.length, 'No hidden arguments');
  t.end();
});