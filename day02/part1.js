const fs = require('fs');
let codeInput = fs.readFileSync('puzzleinput.txt', 'utf8').split('\n');

const colors = {'red': 12, 'green': 13, 'blue': 14};
let arr, game, sets, good;
let sum = 0;

for (let str of codeInput) {
  arr = str.split(": ");
  game = arr[0].split(" ")[1];
  sets = arr[1].split("; ").map(set => set.split(', '));
  good = true;
  loop:
  for (let set of sets) {
    // console.log(set)
    for (let ele of set) {
      for (let color in colors) {
        if (ele.includes(color) && parseInt(ele.split(' ')[0]) > colors[color]) {
          good = false;
          break loop;
        }
      }
    }
  }
  if (good) sum += parseInt(game);
}
console.log(sum)