import Day from '../day';
import { Response } from '../index';

export default class Day06 implements Day {
  main(data: string): Response {
    const split: string[] = data.split('');
    let array: string[] = [];
    let part1: number = -1;
    let part2: number = -1;
    for (let i: number = 0; i < split.length; i++) {
      const letter: string = split[i];
      const index: number = array.findIndex(
        (value: string): boolean => letter === value
      );

      if (index !== -1)
        array = array.filter((_: string, idx: number): boolean => idx > index);

      array.push(letter);

      if (array.length === 4 && part1 === -1) part1 = i + 1;

      if (array.length === 14 && part2 === -1) part2 = i + 1;

      if (part1 !== -1 && part2 !== -1) break;
    }
    return [part1, part2];
  }
}
