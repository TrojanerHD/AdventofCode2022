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

    let currentSand = { x: 500, y: 0 };
		let oldSand = {x: 500, y: 0};
    let unitsOfSand = 0;
    while (
      maxY >= currentSand.y
    ) {
			blocked.push(oldSand);
      if (
        !blocked.some(
          (value) => value.x === currentSand.x && value.y === currentSand.y + 1
        )
      ) {
        currentSand.y++;
        continue;
      }
      if (
        !blocked.some(
          (value) =>
            value.x === currentSand.x - 1 && value.y === currentSand.y + 1
        )
      ) {
        currentSand.y++;
        currentSand.x--;
        continue;
      }
      if (
        !blocked.some(
          (value) =>
            value.x === currentSand.x + 1 && value.y === currentSand.y + 1
        )
      ) {
        currentSand.y++;
        currentSand.x++;
        continue;
      }

			oldSand = {...currentSand};
      currentSand = { x: 500, y: 0 };
      unitsOfSand++;
    }
    return [unitsOfSand];
  }
}
