var test = require('tap').test
  , bacon = require('..');

test('options', function(t) {
  var b = bacon({
      type: 'all-meat'
    , paras: 10
    , sentences: 100
    , startWithLorem: true
    , https: true
  });
  t.equal(b.options.type, 'all-meat', 'type set');
  t.equal(b.options.paras, 10, 'paras set');
  t.equal(b.options.sentences, 100, 'sentences set');
  t.equal(b.options.startWithLorem, true, 'startWithLorem set');
  t.equal(b.options.https, true, 'https set');
  t.equal(b._requests.length, 1, 'one request in queue');

  b = bacon('all-meat');
  t.equal(b.options.type, 'all-meat', 'type as string set');

  b = bacon(100);
  t.equal(b.options.paras, 100, 'paras as number set');

  t.end();
});
