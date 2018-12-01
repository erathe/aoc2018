'use strict';
const fs = require('fs');
const input = fs
  .readFileSync('./input1')
  .toString('utf-8')
  .trim()
  .split('\n')
  .map(Number);

//part 1
const res1 = input.reduce((acc, curr) => (acc += curr), 0);
console.log('result1: ', res1);

console.time('run');
// part2
// using an array for lookup takes approx 7500 ms
// using an object takes approx 60 ms
// using a set takes approx 20 ms
let result2 = input => {
  let freq = 0;
  let seen = new Set();
  while (true) {
    for (let num of input) {
      freq += num;
      if (seen.has(freq)) {
        return freq;
      }
      seen.add(freq);
    }
  }
};

console.log("result2: ", result2(input))
console.timeEnd('run');
