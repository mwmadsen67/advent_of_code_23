const fs = require('fs');
const hands = {};
const codeInput = fs.readFileSync('day07/puzzleinput.txt', 'utf8').split('\n').map(str => {
  let hand = str.split(' ');
  hands[hand[0]] = parseInt(hand[1]);
  return hand;
});

// hands:
// {
//   '32T3K': 765,
//   T55J5: 684,
//   KK677: 28,
//   KTJJT: 220,
//   QQQJA: 483
// }

const rank = {'five': [], 'four': [], 'full': [], 'three': [], '2pair': [], 'pair': [], 'high': []};
const five = /(.)\1{4}/;
const four = /(.)\1{3}/;
const three = /(.)\1{2}/;
const pair = /(.)\1{1}/;

for (let hand in hands) {
  let sorted = hand.split('').sort().join('');

  // literally check all the cases
  if (five.test(sorted)) {
    rank['five'].push(hand);
  } else if (four.test(sorted)) {
    rank['four'].push(hand);
  } else if (three.test(sorted)) {
    if (pair.test(sorted.replace(three, ''))) {
      rank['full'].push(hand);
    } else {
      rank['three'].push(hand);
    }
  } else if (pair.test(sorted)) {
    let remainder = sorted.replace(pair, '')
    if (pair.test(remainder)) {
      rank['2pair'].push(hand);
    } else {
      rank['pair'].push(hand);
    }
  } else {
    rank['high'].push(hand);
  }
}

const cardScore = {'2': 1, '3': 2, '4': 3, '5': 4, '6': 5, '7': 6, '8': 7,
                    '9': 8, 'T': 9, 'J': 10, 'Q': 11, 'K': 12, 'A': 13};

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
console.log(mult)
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