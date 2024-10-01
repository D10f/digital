import { regex } from '@d10f/regex';

type RegExpCaptureGroups = {
  value: string;
  [key: string]: string | undefined;
};

/**
 * Parses the input string into a byte amount. Supports decimal and
 * binary units of measurement, by simply providing the nomenclature.
 *
 * @param input string representing a byte amount.
 *
 * @example
 * parseBytes('23 kilobytes')   // 23000
 * parseBytes('23 kb')          // 23000
 * parseBytes('23 kibibytes')   // 23552
 * parseBytes('23 kib')         // 23552
 */
export default function parseBytes(input: string) {
  if (!input) {
    throw new Error('Invalid input.');
  }

  const re = regex`
    ^(?<value>\d*\.?\d+)
    \s*
    (?:
      (?<decimal>
        (?:[kmgtpezy]b)|
        (?:kilo|mega|giga|tera|peta|exa|zetta|yotta)bytes?)|
      (?<binary>
        (?:[kmgtpezy]ib)|
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
