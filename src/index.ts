export function parse(input: string) {
  const match = input.trim().match(re);

  if (!match) {
    throw new Error(
      'Malformed expression: invalid value or unit of measurement provided.'
    );
  }

  const amount = _parseAmount(match);
  const unit = _parseUnit(match);

  const multiplier = _getMultiplier(unit);
  const exponent = _getExponent(unit);

  return amount * multiplier ** exponent;
}

function _parseAmount(match: RegExpMatchArray) {
  return parseFloat(match[1]);
}

function _parseUnit(match: RegExpMatchArray) {
  return match[3].startsWith('byte')
    ? match[3]
    : match[3].toLowerCase().replace(/bytes?/, '');
}

function _getMultiplier(unit: string) {
  const idx = units.findIndex((u) => u === unit);
  const isDecimal = idx < decimalUnits.length;
  return isDecimal ? 1000 : 1024;
}

function _getExponent(unit: string) {
  const idx = units.findIndex((u) => u === unit);
  return idx % (decimalUnits.length / 2);
}

const decimalUnits = [
  'byte',
  'kilo',
  'mega',
  'giga',
  'tera',
  'peta',
  'exa',
  'zetta',
  'yotta',
  'b',
  'kb',
  'mb',
  'gb',
  'tb',
  'pb',
  'eb',
  'zb',
  'yt',
];

const binaryUnits = [
  'byte',
  'kibi',
  'mebi',
  'gibi',
  'tebi',
  'pebi',
  'exbi',
  'zebi',
  'yobi',
  'b',
  'kib',
  'mib',
  'gib',
  'tib',
  'pib',
  'eib',
  'zib',
  'yit',
];

const units = decimalUnits.concat(binaryUnits);

const re = new RegExp(
  `^(\\d+(\\.\\d+)?)\\s?(${units.join('|')})(s|bytes?)?$`,
  'i'
);
