bacon-stream
============

readable stream of bacon ipsum content from [baconipsum.com](http://baconipsum.com)

# Usage

``` js
var bacon = require('bacon-stream');

// pipe to stdout
bacon('meat-and-filler').pipe(process.stdout);

// same as bacon().pipe(process.stdout);
bacon().om();

// same as bacon().pipe(process.stdout);
bacon({type: 'all-meat'}).nom();

// om() and nom() are chainable
bacon({sentences: 7}).om().nom().nom();
```

# Methods

```js
bacon(options);
```

Creates a new `bacon-stream` with the specified options. If options are not specified the defaults will be used:

```js
{
  type: 'meat-and-filler',   // 'all-meat' for meat only
  paras: 5,                  // number of paragraphs
  sentences: 0,              // number of sentences (overrides paragraphs)
  startWithLorem: false,     // start first paragraph with 'Bacon ipsum dolor sit amet'
  https: false               // https://baconipsum.com/api/
}
```

Shorthand to set just `type`:
```js
bacon('all-meat'); // {type: 'all-meat'}
```

Shorthand to set just `paras`:
```js
bacon(10); // {paras: 10}
```

# Install

```
npm install bacon-stream
```

# TODO

* refresh and cache
* om() and nom() extend

License: [MIT](http://danjarvis.mit-license.org)
