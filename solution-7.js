'use strict';
const fs = require('fs');
const R = require('ramda');
const input = fs
  .readFileSync('./input7')
  .toString('utf-8')
  .trim()
  .split('\n');
console.time('run');
let sortByFirst = R.sortBy(R.prop(0));
let dec = n => (n.t > 0 ? { ...n, t: n.t - 1 } : { ...n, t: 0 });
let getKeyFromPair = R.compose(
  R.pluck(0),
  R.toPairs
);
let nodes = new Set();

const descendants = input.map(row => row.split(' ')).reduce((acc, curr) => {
  let [first, second] = [curr[1], curr[7]];
  nodes.add(first);
  nodes.add(second);
  if (!acc[first]) acc[first] = [second];
  else acc[first].push(second);
  return acc
}, {});

const vertexCount = R.mergeAll([...nodes].map(key => {
  let edges = Object.values(descendants).filter(nodeList =>
    nodeList.find(e => e === key)
  ).length;
  return { [key]: edges };
}));

const result1 = topSearch({...descendants}, {...vertexCount});
const result2 = workersTopSearch({...descendants}, {...vertexCount});

// Function for part 1
function topSearch(nodes, count) {
  let result = [];
  let queue = getKeyFromPair(R.filter(n => n === 0, count)).sort();
  while (queue.length > 0) {
    let node = queue.shift();
    result.push(node);
    if (nodes[node]) {
      nodes[node].forEach(n => {
        if (count[n] > 0) count[n]--;
        if (count[n] === 0) queue.push(n);
      });
    }
    queue.sort();
  }
  return result;
}

// Function for part 2
function workersTopSearch(nodes, count) {
  let workers = [
    { p: '', t: 0 },
    { p: '', t: 0 },
    { p: '', t: 0 },
    { p: '', t: 0 },
    { p: '', t: 0 },
  ];
  let result = [];
  let queue = getKeyFromPair(R.filter(n => n === 0, count))
  let seconds = 0;
  while (result.length < 26) {
    [...queue].forEach(node => {
      let idleWorker = R.pluck('t', workers).indexOf(0);
      if (idleWorker !== -1) {
        queue.shift()
        workers[idleWorker].p = node;
        workers[idleWorker].t = node.charCodeAt(0) - 4;
      }
    })

    workers
      .filter(w => w.p !== '' && w.t === 1)
      .forEach(w => {
        let node = w.p;
        w.p = '';
        result.push(node);
        if (nodes[node]) {
          nodes[node].forEach(n => {
            if (count[n] > 0) count[n]--;
            if (count[n] === 0) queue.push(n);
          });
        }
        queue.sort();
      });

    workers = workers.map(dec);
    seconds++;
  }
  return seconds;
}
console.log(R.join('', result1));
console.log(result2);

console.timeEnd('run');
