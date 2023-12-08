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
let relsteps = 0;
let done = false
const tracking = []

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
    if (curr[i][2] === 'Z') {
      if (!tracking[curr[i]]) tracking[curr[i]] = [steps+1];
    }
  }
  if (Object.keys(tracking).length === curr.length) done = true;

  relsteps++;
  if (relsteps === dirs.length) relsteps = 0;
}

let sum = 1;

// i think I have to do prime factorization

const isPrime = (num) => {
  let i = 2;
  while (i <= num / 2) {
    if (num % i === 0) {
      return false;
    }
    i++;
  }
  return true;
}

for (let val in tracking) {
  let num = tracking[val].shift();
  // console.log(num)
  while (!isPrime(num)) {
    let i = 2;
    loop:
    while (i <= num / 2) {
      if (isPrime(i) && num % i == 0) {
        tracking[val].push(i);
        num = num / i;
        break loop;
      }
      i += 1;
    }
  }
  tracking[val].push(num);
}

const lcms = [];

for (let nums of Object.values(tracking)) {
  for (num of nums) {
    if (!lcms.includes(num)) lcms.push(num);
  }
}

for (let mults of lcms) {
  sum *= mults;
}



console.log(tracking);

console.log(sum);

// its hanging again
// tried math approach: 1.7805435973203438e+25
// that was dumb
// prime factorization:
// 8245452805243

