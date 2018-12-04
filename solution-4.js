'use strict';
const fs = require('fs');
const input = fs
  .readFileSync('./input4')
  .toString('utf-8')
  .trim()
  .split('\n')
  .sort();
console.time('run');

let activeGuard, sleepstart;

const getKeyByValue = (object, value) => {
  return Object.keys(object).find(key => object[key] === value);
};

const maxSleptValue = guard => Math.max(...Object.values(guard.minutes));

const guardData = input.reduce((acc, curr) => {
  const [minutes, operation, id] = [
    Number(curr.substring(15, 17)),
    curr.substring(19, curr.length).split(' ')[0],
    curr.substring(19, curr.length).split(/[#\s]/g)[2]
  ];
  if (operation.startsWith('G')) {
    activeGuard = id;
    if (!acc[activeGuard]) acc[activeGuard] = { minutes: {} };
  } else if (operation.startsWith('f')) {
    sleepstart = Number(minutes);
  } else {
    let slept = Number(minutes) - sleepstart;
    Array.from({ length: slept }, (_, i) => i + sleepstart).forEach(val => {
      acc[activeGuard].minutes[val] = (acc[activeGuard].minutes[val] || 0) + 1;
    });
    acc[activeGuard].totSlept = (acc[activeGuard].totSlept || 0) + slept;
  }
  return acc;
}, {});

const MostSleptGuard = Object.keys(guardData).reduce(
  (max, key) =>
    guardData[key].totSlept > max[1] ? [key, guardData[key].totSlept] : max,
  ['', -Infinity]
)[0];

const partOne =
  getKeyByValue(
    guardData[MostSleptGuard].minutes,
    maxSleptValue(guardData[MostSleptGuard])
  ) * MostSleptGuard;

const partTwo = Object.keys(guardData).reduce(
  (max, key) => {
    const maxValGuard = maxSleptValue(guardData[key]);
    return maxValGuard > max[2]
      ? [key, getKeyByValue(guardData[key].minutes, maxValGuard), maxValGuard]
      : max;
  },
  ['', '', -Infinity]
);

console.log(partOne);
console.log(Number(partTwo[0]) * Number(partTwo[1]));
console.timeEnd('run');
