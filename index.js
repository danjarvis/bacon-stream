var Readable = require('stream').Readable
  , http = require('http')
  , util = require('util')
  , xtend = require('xtend')
  , host = "baconipsum.com"
  , defaults = {
      type: 'meat-and-filler'
    , paras: 5
    , sentences: 0
    , startWithLorem: false
    , https: false
  }
;

function BaconStream(options) {
  if (!(this instanceof(BaconStream)))
    return new BaconStream(options);

  Readable.call(this);
  this.options = defaults;
  this.xtend(options);
  this._done = false;
  this._bacon = [];
  this._requests = [this.getUri()];
}
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

BaconStream.prototype.xtend = function(options) {
  var opts = options || {};
  if (String === opts.constructor)
    this.options.type = opts;
  else if (Number === opts.constructor)
    this.options.paras = opts;
  else
    this.options = xtend(defaults, opts);
};

BaconStream.prototype.getUri = function() {
  var opts = this.options;
  return util.format('%s://%s/api/?', (opts.https ? 'https' : 'http'), host) +
    util.format('type=%s', opts.type) +
    util.format('&%s=%d', (opts.paras > 0 ? 'paras' : 'sentences'), (opts.paras >= 5 ? opts.paras : opts.sentences)) +
    util.format('%s', (opts.startWithLorem ? '&start-with-lorem=1' : ''));
};

BaconStream.prototype.getBacon = function(api) {
  var newBacon = "", self = this;
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
  this.xtend(opts);
  this._requests.push(this.getUri());
  return this;
};

BaconStream.prototype.om = BaconStream.prototype.nom;

module.exports = function(options) {
  return new BaconStream(options);
}
