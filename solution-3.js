'use strict';
const fs = require('fs');
const input = fs
  .readFileSync('./input3')
  .toString('utf-8')
  .trim()
  .split('\n');
console.time('run');
let coords = {};
let patches = input.reduce((acc, curr) => {
  const [id, Xcoord, Ycoord, Xlength, Ylength] = curr.trim().split(/[@,:x]/);
  return [
    ...acc,
    {
      id,
      Xcoord: Number(Xcoord),
      Ycoord: Number(Ycoord),
      Xlength: Number(Xlength),
      Ylength: Number(Ylength)
    }
  ];
}, []);
patches.forEach(({ Xcoord, Ycoord, Xlength, Ylength }) => {
  for (let i = Xcoord; i < Xcoord + Xlength; i++) {
    for (let j = Ycoord; j < Ycoord + Ylength; j++) {
      coords[`${i},${j}`] = (coords[`${i},${j}`] || 0) + 1;
    }
  }
});

patches.forEach(({ id, Xcoord, Ycoord, Xlength, Ylength }) => {
  let pristine = true;
  for (let i = Xcoord; i < Xcoord + Xlength; i++) {
    for (let j = Ycoord; j < Ycoord + Ylength; j++) {
      if (coords[`${i},${j}`] > 1) {
        pristine = false;
        break;
      } 
      if(pristine === false) break;
    }
  }
  if (pristine) console.log(id)
});
console.log(
  Object.values(coords).reduce((acc, curr) => (curr > 1 ? acc + 1 : acc), 0)
);

console.timeEnd('run');
