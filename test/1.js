var test = require('tap').test
  , util = require('util')
  , query = require('querystring')
  , bacon = require('../');

test('options', function(t) {
  var b = bacon({
      type: 'all-meat'
    , paras: 10
    , startWithLorem: true
    , https: true
  });
  t.equal(b.options.type, 'all-meat', 'type set');
  t.equal(b.options.paras, 10, 'paras set');
  t.equal(b.options.startWithLorem, true, 'startWithLorem set');
  t.equal(b.options.https, true, 'https set');
  t.equal(b._requests.length, 1, 'one request in queue');

  b = bacon('all-meat');
  t.equal(b.options.type, 'all-meat', 'type as string set');

  b = bacon(100);
  t.equal(b.options.paras, 100, 'paras as number set');

  t.end();
});

test('default query', function(t) {
  var b = bacon()
    , r = b._requests[0]
    , s = r.substring(r.indexOf('?') + 1)
    , q = query.parse(s);

  t.comment(r);
  t.comment(util.inspect(q));

  t.ok(q, 'has query string');
  t.equal(Object.keys(q).length, 2, 'has two query parameters');
  t.equal(q.type, 'meat-and-filler', 'query type set');
  t.equal(q.paras, '5', 'query paras set');
  t.end();
});

test('meaty-sentences query', function(t) {
  var b = bacon({type: 'all-meat', sentences: 23})
    , r = b._requests[0]
    , s = r.substring(r.indexOf('?') + 1)
    , q = query.parse(s);

  t.comment(r);
  t.comment(util.inspect(q));

  t.ok(q, 'has query string');
  t.equal(Object.keys(q).length, 2, 'has two query parameters');
  t.equal(q.type, 'all-meat', 'query type set');
  t.equal(q.sentences, '23', 'query sentences set');
  t.type(q.paras, 'undefined', 'query paras NOT set');
  t.end();
});
