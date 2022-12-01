import Day from '../day';
import { Response } from '../index';

export default class Day01 implements Day {
  main(data: string): Response {
    const elves = [0];
    let counter = 0;
    for (const line of data.split('\n')) {
      if (line === '') {
        counter++;
        elves.push(0);
      }

      elves[counter] += Number(line);
    }
    const sorted = elves.sort((a, b) => (a < b ? 1 : -1));
    return [
      {
        message:
          'The elf with the most carrying food carries this amount of food',
        value: sorted[0].toString(),
      },
      {
        message: 'The top three elves carry this amount of food',
        value: sorted
          .filter((_, index: number) => index < 3)
          .reduce((a, b) => a + b)
          .toString(),
      },
    ];
  }
}
