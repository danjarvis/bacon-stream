bacon-stream
============

readable stream of bacon ipsum content from [baconipsum.com](http://baconipsum.com)

# Usage

```js
var bacon = require('bacon-stream');

// pipe to stdout
bacon('meat-and-filler').pipe(process.stdout);
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

```js
bacon().om(options);
```

Adds another request to the queue using the specified options.

```js
bacon.nom(options);
```

Adds another request to the queue using the specified options.

Note that `om()` and `nom()` return `this` so they can be chained to build up a queue of varying deliciousness:

```js
bacon('all-meat').om({sentences: 20}).nom({type: 'all-meat', paras: 10}).pipe(process.stdout);
```

The example above will make 3 API requests to [baconipsum.com](http://baconipsum.com).

# Install

```
npm install bacon-stream
```

License: [MIT](http://danjarvis.mit-license.org)
