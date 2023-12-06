const fs = require('fs');
const codeInput = fs.readFileSync('day05/puzzleinput.txt', 'utf8').split('\n\n');

// ex seeds:
// 79 to 93 and 55 to 68

// cant check every number

// after everything, [0..99] ->
// [
//   22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
//   34, 35, 43, 36, 37, 38, 39, 40, 41, 42, 90, 91,
//   92, 93,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10,
//   11, 12, 13, 14, 15, 16, 17, 18, 61, 62, 63, 64,
//   65, 66, 20, 21, 44, 45, 85, 86, 87, 88, 89, 94,
//   95, 96, 56, 57, 58, 59, 97, 98, 99, 73,  0, 74,
//   75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 46, 47,
//   48, 49, 50, 51, 52, 53, 54, 55, 60, 68, 69, 70,
//   71, 72, 67, 19
// ]

// how do i keep track of this

// maybe run low numbers backwards through the maps until I hit a seed?
// humidity-to-location map:
// 60 56 37
// 56 93 4
// dest src len
// if loc is 56 to 59 src is 93 to 96

let seeds = codeInput.shift().split(': ')[1].split(' ').map(num => parseInt(num));


const map = codeInput.map( line => {
  line = line.split('\n');
  line.shift();
  return line.map(str =>str.split(' ').map(num => parseInt(num)));
})

let testLoc = 0;

let found = false;
let val;
while (!found) {
  val = testLoc;

  // run loc through maps backwards
  for (let j = map.length -1; j >= 0; j--) {
    for (let range of map[j]) {
      let [dest, src, len] = range;
      if (val >= dest && val < (dest + len)) {
        val += (src - dest);
        break;
      }
    }
  }
  // check if val is inside seeds
  for (let k = 0; k < seeds.length; k += 2) {
    if (val >= seeds[k] && val < seeds[k] + seeds[k+1]) {
      found = true;
      break;
    }
  }
  testLoc += 1;
}

console.log(testLoc - 1);

// took like 1 or 2 min to get 50855035
// maybe come back to check how to improve