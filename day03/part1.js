const fs = require('fs');
const codeInput = fs.readFileSync('day03/puzzleinput.txt', 'utf8').split('\n');

let sum = 0;
let symPts = [];
let numPts = [];

// find symbols points, find part nums, check for nearby symbols, add to sum if so

const symbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/;

for (let i = 0; i < codeInput.length; i++) {
  for (let j = 0; j < codeInput[i].length; j++) {
    // [i,j] === [row, col]
    let chr = codeInput[i][j];
    if (symbols.test(chr)) {
      symPts.push([i,j]);
    }
  }
}
console.log(symPts);

// find nums

const nums = /[(\d){1,3}]+/;

regexp = new RegExp(nums, 'g');
for (let i = 0; i < codeInput.length; i++) {
  [...codeInput[i].matchAll(regexp)].map(res => {
    for (let pt of symPts) {
      if (pt[0] > i + 1) {
        break;
      }
      if (pt[0] >= i - 1 && pt[0] <= i + 1 && pt[1] >= res.index - 1 
        && pt[1] <= res.index + res[0].length) {
          numPts.push(parseInt(res[0]));
          break;
      }
    }
  });
}
console.log(numPts)

for (let partNum of numPts) {
  sum += partNum;
}
console.log(sum);
