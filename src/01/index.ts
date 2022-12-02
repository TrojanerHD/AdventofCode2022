import Day from '../day';
import { Response } from '../index';

export default class Day01 implements Day {
  main(data: string): Response {
    const elves: number[] = [0];
    let counter: number = 0;
    for (const line of data.split('\n')) {
      if (line === '') {
        counter++;
        elves.push(0);
        continue;
      }

      elves[counter] += Number(line);
    }
    const sorted = elves.sort((a: number, b: number): number => b - a);
    return [
      sorted[0],
      sorted.reduce((a: number, b: number, i: number): number =>
        i < 3 ? a + b : a
      ),
    ];
  }
}
