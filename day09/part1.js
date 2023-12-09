const fs = require('fs');
const codeInput = fs.readFileSync('day09/puzzleinput.txt', 'utf8').split('\n').map(str => str.split(' ').map(num => parseInt(num)));

// console.log(codeInput)
// [
//   [ 0, 3, 6, 9, 12, 15 ],
//   [ 1, 3, 6, 10, 15, 21 ],
//   [ 10, 13, 16, 21, 30, 45 ]
// ]

let ans = [];
for (let line of codeInput) {
  let arr = [line];
  while (arr[arr.length - 1][arr[arr.length -1].length - 1] !== 0) {
    let lastline = arr[arr.length-1];
    let eles = [];
    for (let i = 0; i < lastline.length - 1; i++) {
      eles.push(lastline[i+1] - lastline[i]);
    }
    arr.push(eles);
  }
  for (let i = arr.length - 1; i > 0; i--) {
    let end = arr[i][arr[i].length - 1];
    let next = arr[i - 1][arr[i-1].length - 1];
    arr[i - 1].push(end + next);
  }
  ans.push(arr[0][arr[0].length - 1]);
}

// console.log(ans)
console.log(ans.reduce((acc, cur) => acc + cur));