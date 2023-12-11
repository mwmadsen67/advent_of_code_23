const fs = require('fs');
const pipes = fs.readFileSync('day10/puzzleinput.txt', 'utf8').split('\n')

// console.log(pipes);
// [ '7-F7-', '.FJ|7', 'SJLL7', '|F--J', 'LJ.LJ' ]
const positions = {};

const navigatePipes = (dir, r, c, pos) => {
  i = 1;
  while(!pos[[r,c].toString()]) {
    pos[[r,c].toString()] = true;
    let pipe = pipes[r][c];
    switch (pipe) {
      case '7':
        if (dir === 'N') {
          dir = 'W';
          c = c-1;
        } else {
          dir = 'S';
          r = r+1;
        }
        break;
      case 'F':
        if (dir === 'N') {
          dir = 'E';
          c = c+1;
        } else {
          dir = 'S';
          r = r+1;
        }
        break;
      case 'J':
        if (dir === 'S') {
          dir = 'W';
          c = c-1;
        } else {
          dir = 'N';
          r = r-1;
        }
        break;
      case 'L':
        if (dir === 'S') {
          dir = 'E';
          c = c+1;
        } else {
          dir = 'N';
          r = r-1;
        }
        break;
      case '|':
        if (dir === 'N') {   
          r = r-1;
        } else {
          r = r+1;
        }
        break;
      case '-':
        if (dir === 'E') {
          c = c+1;
        } else {
          c = c-1;
        }
        break;
      default:
        break;
    }
  }
  return pos;
}

// J: down left or right up
// 7: up left or right down
// L: down right or left up
// F: up right or left down
// -: right or left
// |: down or up

loop:
for (let r = 0; r < pipes.length; r++) {
  let row = pipes[r];
  for (let c = 0; c < row.length; c++) {
    if (row[c] === 'S') {
      // time to start navigating
      positions[[r,c].toString()] = true;
      let dir = 'S';
      // dirs will be NESW
      // check right left top and bot until find a dir
      if (row[c+1] === '7' || row[c+1] === 'J' || row[c+1] === '-') {
        dir = "E";
        c = c+1;
      } else if (row[c-1] === 'F' || row[c-1] === 'L' || row[c-1] === '-') {
        dir = "W";
        c = c-1;
      } else if (pipes[r-1][c] === '7' || pipes[r-1][c] === 'F' || pipes[r-1][c] === '|') {
        dir = 'N';
        r = r-1;
      } else if (pipes[r+1][c] === 'J' || pipes[r+1][c] === 'L' || pipes[r+1][c] === '|') {
        dir = 'S';
        r = r+1;
      }
      navigatePipes(dir, r, c, positions);
      break loop;
    }
  }
}

let l = Object.values(positions).length;
console.log(l / 2)
// 7063