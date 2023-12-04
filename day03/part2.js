const fs = require('fs');
const codeInput = fs.readFileSync('day03/puzzleinput.txt', 'utf8').split('\n');

let sum = 0;
let numPts = [];
let gearRatios = [];

// find nums

const nums = /[(\d){1,3}]+/;

regexp = new RegExp(nums, 'g');
for (let i = 0; i < codeInput.length; i++) {
  [...codeInput[i].matchAll(regexp)].map(res => {
    numPts.push([res[0], i, res.index]);
  });
}
console.log(numPts)

// find gears 

for (let i = 0; i < codeInput.length; i++) {
  for (let j = 0; j < codeInput[i].length; j++) {
    // [i,j] === [row, col]
    let chr = codeInput[i][j];
    if (chr === '*') {
      let numParts = 0;
      let gearRatio = 1;
      for (let numPt of numPts) {
        if (numPt[1] > i + 1) break;
        if (numPt[1] >= i - 1 && numPt[1] <= i + 1
          && numPt[2] >= j - numPt[0].length && numPt[2] <= j + 1) {
          gearRatio *= parseInt(numPt[0]);
          numParts += 1
        }
      }
      if (numParts === 2) gearRatios.push(gearRatio);
    }
  }
}
console.log(gearRatios);

for (let ratio of gearRatios) {
  sum += ratio;
}
console.log(sum);
