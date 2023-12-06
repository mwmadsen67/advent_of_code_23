const fs = require('fs');
const codeInput = fs.readFileSync('day05/puzzleinput.txt', 'utf8').split('\n\n');

// [
//   'seeds: 79 14 55 13',
//   'seed-to-soil map:\n50 98 2\n52 50 48',
//   'soil-to-fertilizer map:\n0 15 37\n37 52 2\n39 0 15',
//   'fertilizer-to-water map:\n49 53 8\n0 11 42\n42 0 7\n57 7 4',
//   'water-to-light map:\n88 18 7\n18 25 70',
//   'light-to-temperature map:\n45 77 23\n81 45 19\n68 64 13',
//   'temperature-to-humidity map:\n0 69 1\n1 0 69',
//   'humidity-to-location map:\n60 56 37\n56 93 4'
// ]

// ex map:
// seed-to-soil map:
// [ [ 50, 98, 2 ],
//   [ 52, 50, 48 ] ]
// destination range start, source range start, range length
// 98 to 99 -> 50 to 51
// 50 to 97 -> 52 to 99
//
// if >= 98 (src) && < 100 (src + len) -> -48 (dest - source)
// if >= 50 && < 98 -> +2
// 
// check seeds against ranges and map

let seeds = codeInput.shift().split(': ')[1].split(' ').map(num => parseInt(num));
for (let i = 0; i < codeInput.length; i++){
  let map = codeInput[i];

  map = map.split('\n');
  console.log(map.shift());
  map = map.map(str => str.split(' ').map(num => parseInt(num)));
  // console.log(map);

  seeds = seeds.map( seed => {
    for (let range of map) {
      let [dest, src, len] = range;
      if (seed >= src && seed < (src + len)) {
        return seed + (dest - src);
      }
    }
    return seed;
  })
}

const closest = Math.min(...seeds);

console.log(closest)
// 157211394