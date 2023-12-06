const fs = require('fs');
const codeInput = fs.readFileSync('day06/puzzleinput.txt', 'utf8').split('\n');

const times = codeInput[0].split(' ').filter(num => !isNaN(parseInt(num))).map(num => parseInt(num));
const dists = codeInput[1].split(' ').filter(num => !isNaN(parseInt(num))).map(num => parseInt(num));
let product = 1;

for (let i = 0; i < times.length; i++) {
  let ways = 0;
  for (let vel = 1; vel < times[i]; vel++) {
    let dist = vel * (times[i] - vel)
    if (dist > dists[i]) {
      ways += 1;
    }
  }
  product *= ways;
}

console.log(product);
// 219849