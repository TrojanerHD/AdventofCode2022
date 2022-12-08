import Day from '../day';
import { Response } from '../index';

export default class Day08 implements Day {
  main(data: string): Response {
    const split = data.split('\n');
    let result1 = 0;
    const scores = [];
    for (let i = 0; i < split.length; i++) {
      const line = split[i];
      for (let j = 0; j < line.length; j++) {
        const tree = Number(line[j]);
        let tempFound = false;
        let score = 1;
        let tempScore = 0;
        let added = false;
        // Top
        for (let ii = i - 1; ii >= 0; ii--) {
          if (Number(split[ii][j]) >= tree) {
            tempFound = true;
            tempScore++;
            break;
          } else {
            tempScore++;
          }
        }
        score *= tempScore;

        if (!tempFound && !added) {
          result1++;
          added = true;
        }
        tempFound = false;
        tempScore = 0;

        // Bottom
        for (let ii = i + 1; ii < split.length; ii++) {
          if (Number(split[ii][j]) >= tree) {
            tempFound = true;
            tempScore++;
            break;
          } else {
            tempScore++;
          }
        }
        score *= tempScore;

        if (!tempFound && !added) {
          result1++;
          added = true;
        }
        tempFound = false;
        tempScore = 0;

        // Left
        for (let jj = j - 1; jj >= 0; jj--) {
          if (Number(split[i][jj]) >= tree) {
            tempFound = true;
            tempScore++;
            break;
          } else {
            tempScore++;
          }
        }
        score *= tempScore;

        if (!tempFound && !added) {
          result1++;
          added = true;
        }
        tempFound = false;
        tempScore = 0;

        // Right
        for (let jj = j + 1; jj < line.length; jj++) {
          if (Number(split[i][jj]) >= tree) {
            tempFound = true;
            tempScore++;
            break;
          } else {
            tempScore++;
          }
        }
        score *= tempScore;
        scores.push(score);

        if (!tempFound && !added) result1++;
      }
    }
    return [result1, scores.sort((a, b) => b - a)[0]];
  }
}
