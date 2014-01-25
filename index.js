var Readable = require('stream').Readable
  , http = require('http')
  , util = require('util')
  , xtend = require('xtend')
  , host = 'baconipsum.com'
  , defaults = {
      type: 'meat-and-filler'
    , paras: 5
    , sentences: 0
    , startWithLorem: false
    , https: false
  }
;

function BaconStream(opts) {
  if (!(this instanceof BaconStream))
    return new BaconStream(opts);

  Readable.call(this);
  this.options = setOptions(opts || {});
  this._done = false;
  this._bacon = [];
  this._requests = [getUri(this.options)];
}

module.exports = BaconStream;
util.inherits(BaconStream, Readable);

BaconStream.prototype._read = function() {
  if (this._bacon.length > 0) {
    this.pushBacon();
  } else if (this._done) {
    this.push(null);
  } else if (this._requests.length > 0) {
    this.getBacon(this._requests.shift());
  }
};

BaconStream.prototype.getBacon = function(api) {
  var newBacon = '', self = this;
  http.get(api, function(res) {
    res.on('data', function (chunk) {
      newBacon += chunk;
    });
    res.on('end', function() {
      self._bacon = self._bacon.concat(JSON.parse(newBacon));
      self.pushBacon();
    });
  }).on('error', function(e) {
    console.log(e);
  });
};

BaconStream.prototype.pushBacon = function() {
  while (this._bacon.length > 0) {
    if (false === this.push(this._bacon.shift()))
      break;
  }
  this._done = this._requests.length < 1 ? true : false;
};

BaconStream.prototype.nom = function(opts) {
  this.options = setOptions(opts || {});
  this._requests.push(getUri(this.options));
  return this;
};

BaconStream.prototype.om = BaconStream.prototype.nom;

function setOptions(opts) {
  var o = {};
  if (String === opts.constructor)
    o.type = opts;
  else if (Number === opts.constructor)
    o.paras = opts;
  else
    o = opts;
  return xtend(defaults, o);
}

function getUri(opts) {
  return util.format('%s://%s/api/?', (opts.https ? 'https' : 'http'), host) +
    util.format('type=%s', opts.type) +
    (opts.sentences > 0 ? util.format('&sentences=%d', opts.sentences) : util.format('&paras=%d', opts.paras)) +
    util.format('%s', (opts.startWithLorem ? '&start-with-lorem=1' : ''));
}
