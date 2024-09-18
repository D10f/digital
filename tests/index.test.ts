import { test, expect } from 'vitest';
import parse from '../src/index';

function randomInt(min = 0, max = 100) {
  return Math.floor(Math.random() * max + min);
}

function randomFloat(min = 0, max = 100) {
  return parseFloat((Math.random() * max + min).toFixed(2));
}

test('should convert shorthand decimal units accurately', () => {
  expect(parse('1b')).toBe(1);
  expect(parse('1Kb')).toBe(1000 ** 1);
  expect(parse('1Mb')).toBe(1000 ** 2);
  expect(parse('1Gb')).toBe(1000 ** 3);
  expect(parse('1Tb')).toBe(1000 ** 4);
  expect(parse('1Pb')).toBe(1000 ** 5);
  expect(parse('1Eb')).toBe(1000 ** 6);
  expect(parse('1Zb')).toBe(1000 ** 7);
  expect(parse('1Yb')).toBe(1000 ** 8);
});

test('should convert fully named decimal units', () => {
  expect(parse('1 byte')).toBe(1);
  expect(parse('1 kilobyte')).toBe(1000 ** 1);
  expect(parse('1 megabyte')).toBe(1000 ** 2);
  expect(parse('1 gigabyte')).toBe(1000 ** 3);
  expect(parse('1 terabyte')).toBe(1000 ** 4);
  expect(parse('1 petabyte')).toBe(1000 ** 5);
  expect(parse('1 exabyte')).toBe(1000 ** 6);
  expect(parse('1 zettabyte')).toBe(1000 ** 7);
  expect(parse('1 yottabyte')).toBe(1000 ** 8);
});

test('should convert binary units accurately', () => {
  expect(parse('1b')).toBe(1);
  expect(parse('1Kib')).toBe(1024 ** 1);
  expect(parse('1Mib')).toBe(1024 ** 2);
  expect(parse('1Gib')).toBe(1024 ** 3);
  expect(parse('1Tib')).toBe(1024 ** 4);
  expect(parse('1Pib')).toBe(1024 ** 5);
  expect(parse('1Eib')).toBe(1024 ** 6);
  expect(parse('1Zib')).toBe(1024 ** 7);
  expect(parse('1Yib')).toBe(1024 ** 8);
});

test('should convert fully named binary units', () => {
  expect(parse('1 byte')).toBe(1);
  expect(parse('1 kibibyte')).toBe(1024 ** 1);
  expect(parse('1 mebibyte')).toBe(1024 ** 2);
  expect(parse('1 gibibyte')).toBe(1024 ** 3);
  expect(parse('1 tebibyte')).toBe(1024 ** 4);
  expect(parse('1 pebibyte')).toBe(1024 ** 5);
  expect(parse('1 exbibyte')).toBe(1024 ** 6);
  expect(parse('1 zebibyte')).toBe(1024 ** 7);
  expect(parse('1 yobibyte')).toBe(1024 ** 8);
});

test('should handle zero amounts correctly', () => {
  expect(parse('0b')).toBe(0);
  expect(parse('0Kb')).toBe(0);
  expect(parse('0Mb')).toBe(0);
  expect(parse('0Gb')).toBe(0);
  expect(parse('0Tb')).toBe(0);
  expect(parse('0Pb')).toBe(0);
  expect(parse('0Eb')).toBe(0);
  expect(parse('0Zb')).toBe(0);
  expect(parse('0Yb')).toBe(0);
});

test('should handle random int amounts', () => {
  const n = randomInt();

  expect(parse(`${n} bytes`)).toBe(n);
  expect(parse(`${n} kilobytes`)).toBe(n * 1000 ** 1);
  expect(parse(`${n} megabytes`)).toBe(n * 1000 ** 2);
  expect(parse(`${n} gigabytes`)).toBe(n * 1000 ** 3);
  expect(parse(`${n} terabytes`)).toBe(n * 1000 ** 4);
  expect(parse(`${n} petabytes`)).toBe(n * 1000 ** 5);
  expect(parse(`${n} exabytes`)).toBe(n * 1000 ** 6);
  expect(parse(`${n} zettabytes`)).toBe(n * 1000 ** 7);
  expect(parse(`${n} yottabytes`)).toBe(n * 1000 ** 8);
});

test('should handle random float amounts', () => {
  const n = randomFloat();

  expect(parse(`${n} bytes`)).toBe(Math.floor(n));
  expect(parse(`${n} kilobytes`)).toBe(n * 1000 ** 1);
  expect(parse(`${n} megabytes`)).toBe(n * 1000 ** 2);
  expect(parse(`${n} gigabytes`)).toBe(n * 1000 ** 3);
  expect(parse(`${n} terabytes`)).toBe(n * 1000 ** 4);
  expect(parse(`${n} petabytes`)).toBe(n * 1000 ** 5);
  expect(parse(`${n} exabytes`)).toBe(n * 1000 ** 6);
  expect(parse(`${n} zettabytes`)).toBe(n * 1000 ** 7);
  expect(parse(`${n} yottabytes`)).toBe(n * 1000 ** 8);
});

test('should error out on negative numbers', () => {
  expect(() => parse('-9mb')).toThrow();
});

test('should error out on malformed strings', () => {
  expect(() => parse('testing to fail')).toThrow();
  expect(() => parse('megabytes')).toThrow();
  expect(() => parse('5 totalbytes')).toThrow();
  expect(() => parse('megabytes 5')).toThrow();
  expect(() => parse('5_megabytes')).toThrow();
  expect(() => parse('5megabytessdfsfd')).toThrow();
});

test('should treat integers as bytes', () => {
  expect(parse('123')).toBe(123);
});

test('should treat float-only inputs as integers', () => {
  expect(parse('123.95')).toBe(123);
});
