const fs = require('fs');
const codeInput = fs.readFileSync('day04/puzzleinput.txt', 'utf8').split('\n').map(card => (
  card.split(': ')[1].split('| ').map(str => str.split(' '))
));

let sum = 0;

// console.log(codeInput);

for (let card of codeInput) {
  let matches = 0;
  for (let yourNum of card[1]) {
    if (yourNum === '') continue;
    if (card[0].includes(yourNum)) {
      matches++;
    }
  }
  if (matches === 0) {
    continue;
  } else {
    sum += 2 ** (matches - 1);
  }
}
console.log(sum);