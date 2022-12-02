import Day from '../day';
import { Response } from '../index';

export default class Day02 implements Day {
  main(data: string): Response {
    const split: string[] = data.split('\n');
    let points = 0;
    let pointsTwo = 0;
    for (const value of split) {
      const both = value.split(' ');
      const opponent = both[0];
      let you = both[1];
      let stop = false;
      switch (you) {
        case 'X':
          you = 'A';
          points++;
          switch (opponent) {
            case 'A':
              pointsTwo += 3;
              break;
            case 'B':
              pointsTwo++;
              break;
            case 'C':
              pointsTwo += 2;
              points += 6;
              stop = true;
              break;
          }
          break;
        case 'Y':
          you = 'B';
          switch (opponent) {
            case 'A':
              points += 6;
              pointsTwo++;
              stop = true;
              break;
            case 'B':
              pointsTwo += 2;
              break;
            case 'C':
              pointsTwo += 3;
              break;
          }
          pointsTwo += 3;
          points += 2;
          break;
        case 'Z':
          you = 'C';
          points += 3;
          switch (opponent) {
            case 'A':
              pointsTwo += 2;
              break;
            case 'B':
              points += 6;
              pointsTwo += 3;
              stop = true;
              break;
            case 'C':
              pointsTwo++;
              break;
          }
          pointsTwo += 6;
          break;
      }
      if (stop) continue;

      if (you === opponent) {
        points += 3;
        continue;
      }
    }
    return [points, pointsTwo];
  }
}
