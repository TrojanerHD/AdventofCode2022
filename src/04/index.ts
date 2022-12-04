import Day from '../day';
import { Response } from '../index';

export default class Day04 implements Day {
  main(data: string): Response {
    let lines = data.split(/\n/);
    let result1 = 0;
    let result2 = 0;
    for (const line of lines) {
      const pairs = line.split(',');
      const both1 = pairs[0].split('-');
      const start1 = Number(both1[0]);
      const end1 = Number(both1[1]);
      const both2 = pairs[1].split('-');
      const start2 = Number(both2[0]);
      const end2 = Number(both2[1]);
      if (
        (start1 <= start2 && end1 >= end2) ||
        (start1 >= start2 && end1 <= end2)
      ) {
        result1++;
      }
      if (
        (end1 >= start2 && start1 <= end2) ||
        (start2 <= start1 && end2 >= start1)
      ) {
        result2++;
      }
    }
    return [result1, result2];
  }
}
