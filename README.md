A parser that converts strings of digital data storage units into byte representation. Currently supported magnitudes are: `bytes`, `kilobytes`, `megabytes`, `gigabytes`, `terabytes` and `petabytes`.

### Usage:

Import it into your project using CommonJS or ESM modules:

```js
import parse from '@d10f/digital';
// const parse = require('@d10f/digital');

parse('12.5 Gigabytes'); // 12500000000
```

It also supports binary system for better precision:

```js
parse('12.5 Gibibytes'); // 1342177800
```

For convenience you can provide the shorthand for each unit of measurement (case insensitive):

```js
parse('12.5 Gb');
parse('12.5 Gib');
```

### TODO:

- [X] Support for `exabytes`, `zettabytes` and `yottabytes` (small amounts only).
- [ ] Support for BigInt returns `exabytes`, `zettabytes` and `yottabytes`.
