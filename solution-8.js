'use strict';
const fs = require('fs');
const R = require('ramda');
const input = fs
  .readFileSync('./input8')
  .toString('utf-8')
  .trim()
  .split(' ');
console.time('run');
const sumMultiple = (n, array) => R.sum(R.take(n, array));

const dfsImploder = array => {
  let [children, metaCount, ...rest] = array;
  let vals = [];
  let sum = 0;
  for (let i = 0; i < children; i++) {
    let total, val;
    [total, rest, val] = dfsImploder(rest);
    vals.push(val);
    sum += total;
  }

  sum += sumMultiple(metaCount, rest);

  if (children == 0) {
    return [sum, rest.slice(metaCount), sumMultiple(metaCount, rest)];
  } else {
    return [
      sum,
      rest.slice(metaCount),
      R.sum(R.take(metaCount, rest).map(i => (vals[i - 1] ? vals[i - 1] : 0)))
    ];
  }
};
let [total, _, val] = dfsImploder(input);

console.log(total, val);

console.timeEnd('run');
