type RegExpCaptureGroups = {
  value: string;
  [key: string]: string | undefined;
};

export default function parseBits(input: string) {
  if (!input) {
    throw new Error('Invalid input.');
  }

  const re = regex`
    ^(?<value>\d*\.?\d+)
    \s*
    (?:
      (?<decimal>
        (?:[kmgtpez]b)|
        (?:kilo|mega|giga|tera|peta|exa|zetta|yotta)bytes?)|
      (?<binary>
        (?:[kmgtpez]ib)|
        (?:kibi|mebi|gibi|tebi|pebi|exbi|zebi|yobi)bytes?)|
      (?:bytes?|b)
    )?
    $
  `;

  const match = input.trim().toLowerCase().match(re);

  if (!match) {
    throw new Error('Invalid input.');
  }

  const { value, ...systems } = match.groups as RegExpCaptureGroups;
  const magnitudes = ['k', 'm', 'g', 't', 'p', 'e', 'z', 'y'];
  let exponent = 0;
  let system = 1000;

  for (const s in systems) {
    const unit = systems[s];
    if (!unit || unit.startsWith('b')) continue;
    exponent = magnitudes.findIndex((m) => m === unit[0]) + 1;
    system = s === 'binary' ? 1024 : 1000;
  }

  return Math.floor(parseFloat(value) * system ** exponent);
}
// https://stackoverflow.com/questions/12317049/how-to-split-a-long-regular-expression-into-multiple-lines-in-javascript
//build regexes without worrying about
// - double-backslashing
// - adding whitespace for readability
// - adding in comments
let clean = (piece: string) =>
  piece
    .replace(
      /((^|\n)(?:[^\/\\]|\/[^*\/]|\\.)*?)\s*\/\*(?:[^*]|\*[^\/])*(\*\/|)/g,
      '$1'
    )
    .replace(/((^|\n)(?:[^\/\\]|\/[^\/]|\\.)*?)\s*\/\/[^\n]*/g, '$1')
    .replace(/\n\s*/g, '');

function regex({ raw }: TemplateStringsArray, ...interpolations: string[]) {
  return new RegExp(
    interpolations.reduce(
      (regex, insert, index) => regex + insert + clean(raw[index + 1]),
      clean(raw[0])
    )
  );
}
