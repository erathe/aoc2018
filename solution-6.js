'use strict';
const fs = require('fs');
const R = require('ramda');
const input = fs
  .readFileSync('./input6')
  .toString('utf-8')
  .trim()
  .split('\n');
console.time('run');

const getMDist = ([x1, y1], [x2, y2]) => {
  return Math.abs(x2 - x1) + Math.abs(y2 - y1);
};

const dests = input.reduce((a, c, i) => {
  let [x, y] = c.split(', ');
  a[`node${i}`] = { x: Number(x), y: Number(y), count: 0 };
  return a;
}, {});

const dests2 = input.reduce((a, c, i) => {
  let [x, y] = c.split(', ');
  a[`node${i}`] = { x: Number(x), y: Number(y), count: 0 };
  return a;
}, {});

let area = 0;

for (let i = -400; i < 800; i++) {
  for (let j = -400; j < 800; j++) {
    let mDistSum = 0;
    let [node, dist, ...rest] = Object.entries(dests).reduce(
      (a, c) => {
        let mDist = getMDist([c[1].x, c[1].y], [i, j]);
        mDistSum += mDist
        if(mDist === a[1]) return [...a, c[0]];
        return mDist < a[1] ? [c[0], mDist] : a;
      },
      ['', Infinity]
    );
    if(mDistSum < 10000) area++;
    if(rest.length === 0) dests[node].count += 1;
  }
}

for (let i = -550; i < 850; i++) {
  for (let j = -550; j < 850; j++) {
    let [node, dist, ...rest] = Object.entries(dests2).reduce(
      (a, c) => {
        let mDist = getMDist([c[1].x, c[1].y], [i, j]);
        if(mDist === a[1]) return [...a, c[0]];
        return mDist < a[1] ? [c[0], mDist] : a;
      },
      ['', Infinity]
    );
    if(rest.length === 0) {
      dests2[node].count += 1;
    }
  }
}

let max = 0;

for (let i = 0; i < Object.keys(dests).length; i++){
  if (R.eqProps('count', dests[`node${i}`], dests2[`node${i}`])){
    max = R.max(max, dests[`node${i}`].count) 
  } 
}
console.log(max)
console.log(area)

console.timeEnd('run');
