const fs = require('fs');
let codeInput = fs.readFileSync('puzzleinput.txt', 'utf8').split('\n');

// console.log(codeInput);
let first, last, arr, iArr, iMin, iMax, regexp;
let [min, max] = [Infinity, 0];
// const nums = [];
const checks = {'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6,
  'seven': 7, 'eight': 8, 'nine': 9};
let sum = 0;

for (let str of codeInput) {
  for (let val in checks) {
    // check for the word
    regexp = new RegExp(val, 'g');
    arr = [...str.matchAll(regexp)];
    iArr = arr.map(arr => arr.index);
    iMin = Math.min(...iArr);
    iMax = Math.max(...iArr);
    if (iMin < min) {
      min = iMin;
      first = checks[val];
    }
    if (iMax > max) {
      max = iMax;
      last = checks[val];
    }
    // check for the number
    regexp = new RegExp(checks[val], 'g');
    arr = [...str.matchAll(regexp)]
    iArr = arr.map(arr => arr.index);
    iMin = Math.min(...iArr);
    iMax = Math.max(...iArr);
    if (iMin < min) {
      min = iMin;
      first = checks[val];
    }
    if (iMax > max) {
      max = iMax;
      last = checks[val];
    }
  }
  first = first.toString();
  last = last.toString();
  // console.log(first + last + ': ' + str);
  // nums.push(parseInt(first + last));
  sum += parseInt(first + last);
  [min, max] = [Infinity, -Infinity];
}
// console.log(nums)
// let ans = nums.reduce((acc, curr) => acc + curr)
// console.log(ans);
console.log(sum)