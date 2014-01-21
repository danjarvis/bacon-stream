var bacon = require('..');

var b = bacon({startWithLorem: true}).om({type: 'all-meat', paras: 10}).pipe(process.stdout);
//var b = bacon({startWithLorem: true}).pipe(process.stdout);