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
    const sorted = elves.sort((a: number, b: number): number =>
      a < b ? 1 : -1
    );
    return [
      {
        message:
          'The elf with the most carrying food carries this amount of food',
        value: sorted[0].toString(),
      },
      {
        message: 'The top three elves carry this amount of food',
        value: sorted
          .reduce((a: number, b: number, i: number): number =>
            i < 3 ? a + b : a
          )
          .toString(),
      },
    ];
  }
}
