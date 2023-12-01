const fs = require('fs');
let codeInput = fs.readFileSync('puzzleinput.txt', 'utf8').split('\n').map(str => str.split(''));

// console.log(codeInput);
let first, last;
const nums = [];
for (let arr of codeInput) {
  for (let chr of arr) {
    if (!isNaN(parseInt(chr)) && !first) {
      first = chr;
    }
    if (!isNaN(parseInt(chr))) {
      last = chr;
    }
  }
  nums.push(parseInt(first + last));
  [first, last] = [undefined, undefined]
}
console.log(nums)

console.log(nums.reduce((acc, curr) => acc + curr));