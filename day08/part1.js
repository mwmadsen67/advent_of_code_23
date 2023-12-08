const fs = require('fs');
const codeInput = fs.readFileSync('day08/puzzleinput.txt', 'utf8').split('\n');

// directions
// {
//   AAA: [ 'BBB', 'CCC' ],
//   BBB: [ 'DDD', 'EEE' ],
//   CCC: [ 'ZZZ', 'GGG' ],
//   DDD: [ 'DDD', 'DDD' ],
//   EEE: [ 'EEE', 'EEE' ],
//   GGG: [ 'GGG', 'GGG' ],
//   ZZZ: [ 'ZZZ', 'ZZZ' ]
// }

const dirs = codeInput.shift();
codeInput.shift(); // remove space

const map = {};
codeInput.forEach(line => {
  let arr = line.split(' = ');
  let eles = arr[1].split(', ').map((ele, i) => {
    let val;
    if (i === 0) val = ele.replace('(', '');
    if (i === 1) val = ele.replace(')', '');
    return val;
  });

  map[arr[0]] = eles;
})

let curr = 'AAA';
let steps = 0;
let relsteps = 0;
while (curr !== 'ZZZ') {
  let dir = dirs[relsteps]; // current direction
  let options = map[curr]; // current options
  // if (relsteps === 0) console.log(curr, steps)
  if (dir === 'L') {
    curr = options[0];
  } else {
    curr = options[1];
  }
  steps++; // increment steps
  relsteps++;
  if (relsteps === dirs.length) relsteps = 0;
}

console.log(steps);

// this approach is making my computer hang
// jk my starting point was wrong
// my approach is great
// 602 steps
// jk my answer is too low
// 12599 steps after fixing step reseting issue