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
}
util.inherits(BaconStream, Readable);

BaconStream.prototype._read = function() {
  }
};

BaconStream.prototype.xtend = function(options) {
  var opts = options || {};
  if (String === opts.constructor)
    this.options.type = opts;
  else if (Number === opts.constructor)
    this.options.paras = opts
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

BaconStream.prototype.getBacon = function(fn) {
  http.get(this.getUri(), function(res) {
    fn(null, res);
  }).on('error', fn);
};

BaconStream.prototype.nom = function(s) {
  this.pipe(s || process.stdout);
  return this;
};

BaconStream.prototype.om = BaconStream.prototype.nom;

module.exports = function(options) {
  return new BaconStream(options);
}