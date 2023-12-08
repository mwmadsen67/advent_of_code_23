const fs = require('fs');
const codeInput = fs.readFileSync('day08/puzzleinput.txt', 'utf8').split('\n');

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

let curr = [];
for (let point in map) {
  if (point[2] === 'A') curr.push(point);
}
console.log(curr);
let steps = 0;
let relsteps = 0;
let done = false
while (!done) {
  let dir = dirs[relsteps];
  done = true;
  for (let i = 0; i < curr.length; i++) {
    let options = map[curr[i]];
    if (dir === 'L') {
      curr[i] = options[0];
    } else {
      curr[i] = options[1];
    }
    if (curr[i][2] !== 'Z') done = false;
  }
  // if (relsteps === 0) console.log(curr, steps)
  steps++; // increment steps
  relsteps++;
  if (relsteps === dirs.length) relsteps = 0;
}

console.log(curr)
console.log(steps);

// its hanging again