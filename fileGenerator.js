const fs = require('fs');
const fetch = require('node-fetch')
const session = require('./session.js');
const day = process.argv[2];

const template = `'use strict';
const fs = require('fs');
const input = fs
  .readFileSync('./input${day}')
  .toString('utf-8')
  .trim()
  .split('\\n')
console.time('run');

console.timeEnd('run')`;

const filesToCreate = [
  {
    filename: `solution-${day}.js`,
    content: template,
    getData: false
  },
  {
    filename: `input${day}`,
    content: '',
    getData: true
  }
];

const getInput = async session => {
  const opts = {
    headers: {
      cookie: `session=${session}`
    }
  };
  const result = await fetch(
    `https://adventofcode.com/2018/day/${day}/input`,
    opts
  );
  return await result.text()
};

const createFile = async (filename, content, getData) => {
  if (getData) {
    content = await getInput(session)
  }
  fs.writeFile(filename, content, err => {
    if (err) {
      console.log(err);
    }
    console.log(`file ${filename} was created`);
  });
};

for (let file of filesToCreate) {
  createFile(file.filename, file.content, file.getData);
}
