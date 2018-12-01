const fs = require('fs');
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
    content: template
  },
  {
    filename: `input${day}`,
    content: ''
  }
];

const createFile = (filename, content) => {
  fs.writeFile(filename, content, err => {
    if (err) {
      console.log(err);
    }

    console.log(`file ${filename} was created`);
  });
};

for (let file of filesToCreate) {
  createFile(file.filename, file.content);
}
