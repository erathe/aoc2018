'use strict';
const fs = require('fs');
const input = fs
  .readFileSync('./input5')
  .toString('utf-8')
  .trim();

console.time('run');

const imploder = array => {
  let done = false;
  while (!done) {
    let implosion = false;
    array.forEach((c, i, a) => {
      if (c === c.toLowerCase() && a[i + 1] === c.toUpperCase()) {
        array.splice(i, 2);
        implosion = true;
      } else if (c === c.toLowerCase() && a[i - 1] === c.toUpperCase()) {
        array.splice(i - 1, 2);
        implosion = true;
      }
    });
    if (implosion === false) done = true;
  }
  return array;
};

//part 1
console.log('Part 1: ', imploder(input.split('')).length);

//part 2
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
const res2 = alphabet
  .map(c => {
    const reg = new RegExp(`\[${c}${c.toUpperCase()}\]`, 'g');
    const testString = input.replace(reg, '');
    return imploder(testString.split('')).length;
  })
  .reduce((a, c) => (a < c ? a : c), Infinity);

console.log('Part 2: ', res2);
console.timeEnd('run');
