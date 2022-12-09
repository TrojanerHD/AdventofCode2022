import Day from '../day';
import { Response } from '../index';

interface Coordinate {
  x: number;
  y: number;
}

export default class Day09 implements Day {
  main(data: string): Response {
    const lines = data.split('\n');
    const head = { x: 0, y: 0 };
    let tailP1 = { x: 0, y: 0 };
    const tails = [];
    for (let i = 0; i < 10; i++) tails[i] = { x: 0, y: 0 };
    const visitedP1: Coordinate[] = [];
    const visitedP2: Coordinate[] = [];

    for (const line of lines) {
      const split = line.split(' ');
      for (let i = 0; i < Number(split[1]); i++) {
        switch (split[0]) {
          case 'R':
            head.x++;
						tails[0].x++;
            break;
          case 'U':
            head.y--;
						tails[0].y--;
            break;
          case 'D':
            head.y++;
						tails[0].y++;
            break;
          case 'L':
            head.x--;
						tails[0].x--;
            break;
        }

        tailP1 = this.moveTail(tailP1, head);
        for (let j = 1; j < tails.length; j++) {
          tails[j] = this.moveTail(tails[j], tails[j - 1]);
        }

        if (
          !visitedP1.some(
            (coordinate) =>
              coordinate.x === tailP1.x && coordinate.y === tailP1.y
          )
        ) {
          visitedP1.push({ ...tailP1 });
        }

        if (
          !visitedP2.some(
            (coordinate) =>
              coordinate.x === tails[tails.length - 1].x &&
              coordinate.y === tails[tails.length - 1].y
          )
        ) {
          visitedP2.push({ ...tails[tails.length - 1] });
        }
      }
    }
    return [visitedP1.length, visitedP2.length];
  }

  private moveTail(tail: Coordinate, head: Coordinate): Coordinate {
    if (Math.abs(head.x - tail.x) > 1 || Math.abs(head.y - tail.y) > 1) {
      if (head.x > tail.x) {
        tail.x++;
      } else if (head.x < tail.x) {
        tail.x--;
      }

      if (head.y > tail.y) {
        tail.y++;
      } else if (head.y < tail.y) {
        tail.y--;
      }
    }
    return tail;
  }
}
