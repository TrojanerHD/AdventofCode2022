import { Response } from '..';
import Day from '../day';

interface Point {
  x: number;
  y: number;
}

export default class Day14 implements Day {
  main(data: string): Response {
    const lines = data.split('\n');
    const blocked = [];
    let maxY = 0;
    for (const line of lines) {
      const points = line.split(' -> ');
      for (let i = 0; i < points.length - 1; i++) {
        const point1Raw = points[i].split(',');
        const point2Raw = points[i + 1].split(',');

        const point1 = { x: Number(point1Raw[0]), y: Number(point1Raw[1]) };
        const point2 = { x: Number(point2Raw[0]), y: Number(point2Raw[1]) };

        if (point1.x === point2.x) {
          for (
            let i = Math.min(point1.y, point2.y);
            i <= Math.max(point1.y, point2.y);
            i++
          ) {
            if (!blocked.some((value) => value.x === point1.x && value.y === i))
              blocked.push({ x: point1.x, y: i });
          }
          maxY = Math.max(maxY, Math.max(point1.y, point2.y));
        }
        if (point1.y === point2.y) {
          for (
            let i = Math.min(point1.x, point2.x);
            i <= Math.max(point1.x, point2.x);
            i++
          ) {
            if (!blocked.some((value) => value.x === i && value.y === point1.y))
              blocked.push({ x: i, y: point1.y });
          }
        }
      }
    }

    let currentSand1 = { x: 500, y: 0 };
    let oldSand = { x: 500, y: 0 };
    let unitsOfSand1 = 0;
    while (maxY >= currentSand1.y) {
      blocked.push(oldSand);
      if (
        !blocked.some(
          (value) =>
            value.x === currentSand1.x && value.y === currentSand1.y + 1
        )
      ) {
        currentSand1.y++;
        continue;
      }
      if (
        !blocked.some(
          (value) =>
            value.x === currentSand1.x - 1 && value.y === currentSand1.y + 1
        )
      ) {
        currentSand1.y++;
        currentSand1.x--;
        continue;
      }
      if (
        !blocked.some(
          (value) =>
            value.x === currentSand1.x + 1 && value.y === currentSand1.y + 1
        )
      ) {
        currentSand1.y++;
        currentSand1.x++;
        continue;
      }

      oldSand = { ...currentSand1 };
      currentSand1 = { x: 500, y: 0 };
      unitsOfSand1++;
    }

    let currentSand2 = [{ x: 500, y: 0 }];
    let unitsOfSand2 = 1;
    let topY = 0;
    while (topY !== maxY + 1) {
      const sandLength = currentSand2.length;
      for (let i = 0; i < sandLength; i++) {
        const sand = currentSand2[i];
        if (
          !blocked
            .concat(currentSand2)
            .some((value) => value.x === sand.x && value.y === sand.y + 1)
        ) {
          unitsOfSand2++;
          currentSand2.push({ x: sand.x, y: sand.y + 1 });
        }
        if (
          !blocked
            .concat(currentSand2)
            .some((value) => value.x === sand.x - 1 && value.y === sand.y + 1)
        ) {
          unitsOfSand2++;
          currentSand2.push({ x: sand.x - 1, y: sand.y + 1 });
        }
        if (
          !blocked
            .concat(currentSand2)
            .some((value) => value.x === sand.x + 1 && value.y === sand.y + 1)
        ) {
          unitsOfSand2++;
          currentSand2.push({ x: sand.x + 1, y: sand.y + 1 });
        }
      }
      currentSand2 = currentSand2.filter((value: Point) => value.y !== topY);
      topY++;
    }

    return [unitsOfSand1, unitsOfSand2];
  }
}
