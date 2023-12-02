const fs = require('fs');
const codeInput = fs.readFileSync('puzzleinput.txt', 'utf8').split('\n');

// let arr, sets, colors;
let sum = 0;

for (let str of codeInput) {
  let arr = str.split(": ");
  let sets = arr[1].split("; ").map(set => set.split(', '));
  let colors = {'red': 0, 'green': 0, 'blue': 0}
  for (let set of sets) {
    // console.log(set)
    for (let ele of set) {
      let cubes = ele.split(' ').map((res, i) => i === 0 ? parseInt(res) : res);
      if (cubes[0] > colors[cubes[1]]) colors[cubes[1]] = cubes[0];
    }
  }
  let power = 1;
  for (let color in colors) {
    power *= colors[color];
  }
  sum += power;
}
console.log(sum)