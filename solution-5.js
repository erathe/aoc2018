'use strict';
const fs = require('fs');
const input = fs
  .readFileSync('./input5')
  .toString('utf-8')
  .trim();

console.time('run');

const imploder = array => {
  let i = 0
  while(true) {
    if (i >= array.length-1) break;
    else if (Math.abs(array[i].charCodeAt(0) - array[i + 1].charCodeAt(0)) === 32) {
      array.splice(i, 2);
      if (i > 0) i -= 1;
    } else {
      i++
    }
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
