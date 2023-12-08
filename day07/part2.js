const fs = require('fs');
const hands = {};
const codeInput = fs.readFileSync('day07/puzzleinput.txt', 'utf8').split('\n').map(str => {
  let hand = str.split(' ');
  hands[hand[0]] = parseInt(hand[1]);
  return hand;
});

const rank = {'five': [], 'four': [], 'full': [], 'three': [], '2pair': [], 'pair': [], 'high': []};
const five = /(.)\1{4}/;
const four = /(.)\1{3}/;
const three = /(.)\1{2}/;
const pair = /(.)\1{1}/;

for (let hand in hands) {
  let sorted = hand.split('').sort().join('');
  
  // need to do something weird with jacks
  if (five.test(sorted)) {
    rank['five'].push(hand);
  } else if (four.test(sorted)) {
    // check if any card is a jack before sorting (has to be first or last)
    if (sorted[0] === 'J' || sorted[4] === 'J') {
      rank['five'].push(hand);
    } else {
      rank['four'].push(hand);
    }
  } else if (three.test(sorted)) {
    let extra = sorted.replace(three, '');

    if (pair.test(extra)) {
      // if full house, either a J in the trips or pair will make a five
      if (sorted[2] === 'J' || extra[0] === 'J') {
        rank['five'].push(hand);
      } else {
        rank['full'].push(hand);
      }
    } else {
      // if regular trips, check the trips and the others to make a quad
      if (sorted[2] === 'J' || extra[0] === 'J' || extra[1] === 'J') {
        rank['four'].push(hand);
      } else {
        rank['three'].push(hand);
      }
    }
  } else if (pair.test(sorted)) {
    let extra = sorted.replace(pair, '')
    let idx1 = sorted.search(pair);
    if (pair.test(extra)) {
      // 2 pair becomes quads if a pair is jacks
      let idx2 = extra.search(pair);
      // full house if non paired other card is a jack
      let other = extra.replace(pair, '');
      if (sorted[idx1] === 'J' || extra[idx2] === 'J') {
        rank['four'].push(hand);
      } else if (other === 'J') {
        rank['full'].push(hand);
      } else {
        if (hand === 'AATJT') {
          console.log(other)
          console.log(extra)
        }
        rank['2pair'].push(hand);
      }
    } else {
      // if any card is a jack, becomes trips
      if (sorted.includes('J')) {
        rank['three'].push(hand);
      } else {
        rank['pair'].push(hand);
      }
    }
  } else {
    // if any card is a jack, becomes a pair
    if (sorted.includes('J')) {
      rank['pair'].push(hand);
    } else {
      rank['high'].push(hand);
    }
  }
}

// J is weaker now
const cardScore = {'J': 0, '2': 1, '3': 2, '4': 3, '5': 4, '6': 5, '7': 6, '8': 7,
                    '9': 8, 'T': 9, 'Q': 10, 'K': 11, 'A': 12};

const cardSort = (a,b) => {
  for (let i = 0; i < a.length; i++) {
    if (cardScore[a[i]] < cardScore[b[i]]) {
      return 1;
    } else if (cardScore[a[i]] > cardScore[b[i]]) {
      return -1;
    }
  }
  return 0;
}

rank['five'] = rank['five'].sort(cardSort);
rank['four'] = rank['four'].sort(cardSort);
rank['full'] = rank['full'].sort(cardSort);
rank['three'] = rank['three'].sort(cardSort);
rank['2pair'] = rank['2pair'].sort(cardSort);
rank['pair'] = rank['pair'].sort(cardSort);
rank['high'] = rank['high'].sort(cardSort);

// console.log(rank)
let mult = codeInput.length;

let ans = 0;
for (let group of Object.values(rank)) {
  for (let hand of group) {
    hands[hand] = hands[hand] * mult;
    ans += hands[hand];
    mult -= 1;
  }
}
console.log(rank)
console.log(ans)

// 248569531