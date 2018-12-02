'use strict';
const fs = require('fs');
const input = fs
  .readFileSync('./input2')
  .toString('utf-8')
  .trim()
  .split('\n');
console.time('run');

//part 1
const find = occurence => boxId => {
  const charArr = boxId.split('');
  for (let char of charArr) {
    if (boxId.match(new RegExp(`${char}`, 'g')).length === occurence) {
      return 1;
    }
  }
  return 0;
};

const find2s = find(2);
const find3s = find(3);

const result = input.reduce(
  (acc, boxId) => {
    [acc[0], acc[1]] = [(acc[0] += find2s(boxId)), (acc[1] += find3s(boxId))];
    return acc;
  },
  [0, 0]
);

console.log(result[0] * result[1]);

//part 2
const getProtoBox = inputArray => {
  for (let str of inputArray) {
    const match = inputArray.find(box => stringCompareOneOff(box, str));
    if (match) {
      return str
        .split('')
        .reduce((acc, c, i) => {
          return c === match.charAt(i) ? [...acc, c] : acc;
        }, [])
        .join('');
    }
  }
  return 'no matches found';
};

const stringCompareOneOff = (str1, str2) => {
  let differences = 0;
  for (let i = 0; i < str1.length; i++) {
    if (str1.charAt(i) !== str2.charAt(i)) differences++;
  }
  return differences === 1;
};

console.log(getProtoBox(input));

console.timeEnd('run');
