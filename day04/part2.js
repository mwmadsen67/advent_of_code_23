const fs = require('fs');
const codeInput = fs.readFileSync('day04/puzzleinput.txt', 'utf8').split('\n').map(card => (
  card.split(': ')[1].split('| ').map(str => str.split(' '))
));

let numCards = 0;
const cardMatches = {};

for (let i = 0; i < codeInput.length; i++) {
  let card = codeInput[i];
  let matches = 0;
  for (let yourNum of card[1]) {
    if (yourNum === '') continue;
    if (card[0].includes(yourNum)) {
      matches++;
    }
  }
  cardMatches[i + 1] = matches;
}

// card -> 1 
// matchKey -> {'1':4,'2':2,'3':2,'4':1,'5':0,'6':0}
const countCards = (card, matchKey, memo = {}) => {
  if (memo[card]) return memo[card];
  if (matchKey[card] === 0) {
    memo[card] = 1;
    return 1;
  }
  
  let count = 1;

  for (let i = 0; i < matchKey[card]; i++) {
    count += countCards(i + card + 1, matchKey, memo);
  }
  memo[card] = count;
  return count;
}

let cards = Object.keys(cardMatches).map(num => parseInt(num));
for(let card of cards) {
  numCards += countCards(card, cardMatches);
}

console.log(numCards);