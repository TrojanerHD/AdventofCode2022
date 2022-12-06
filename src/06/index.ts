import Day from '../day';
import { Response } from '../index';

export default class Day06 implements Day {
  main(data: string): Response {
    const split = data.split('');
    let array = [];
    let part1 = -1;
    let part2 = -1;
    for (let i = 0; i < split.length; i++) {
      const letter = split[i];
      const index = array.findIndex((value) => letter === value);

      if (index !== -1) array = array.filter((_, idx) => idx > index);

      array.push(letter);

      if (array.length === 4 && part1 === -1) {
        part1 = i + 1;
      }

      if (array.length === 14 && part2 === -1) {
        part2 = i + 1;
      }
      if (part1 !== -1 && part2 !== -1) break;
    }
    return [part1, part2];
  }
}
