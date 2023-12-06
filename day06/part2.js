const fs = require('fs');
const codeInput = fs.readFileSync('day06/puzzleinput.txt', 'utf8').split('\n');

const time = parseInt(codeInput[0].split(' ').filter(num => !isNaN(parseInt(num))).join(''));
const dist = parseInt(codeInput[1].split(' ').filter(num => !isNaN(parseInt(num))).join(''));
let ways = 0;
// console.log(time)
// console.log(dist)


for (let vel = 1; vel < time; vel++) {
  let newDist = vel * (time - vel)
  if (newDist > dist) {
    ways += 1;
  }
}

console.log(ways)
// 29432455