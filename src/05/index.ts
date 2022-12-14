import Day from '../day';
import { Response } from '../index';

export default class Day05 implements Day {
  main(data: string): Response {
    const lines: string[] = data.split('\n');
    let readInput: boolean = true;
    const staples: string[][] = [];
    const staples2: string[][] = [];
    for (const line of lines) {
      if (line === '') {
        readInput = false;
        for (let i: number = 0; i < staples.length; i++) {
          staples2.push([]);
          for (let j: number = 0; j < staples[i].length; j++) {
            staples2[i].push(staples[i][j]);
          }
        }
        staples2.push([]);
        continue;
      }
      if (readInput) {
        for (let i: number = 0; i < line.length; i += 4) {
          const toAdd: string = line.substring(i, i + 3);
          if (!toAdd.startsWith('[')) continue;
          while (staples.length <= Math.floor(i / 4)) staples.push([]);
          staples[Math.floor(i / 4)].push(toAdd);
        }
        continue;
      }

      const input: string[] = line.split(' ');
      const count: number = Number(input[1]);
      const startIndex: number = Number(input[3]) - 1;
      const endIndex: number = Number(input[5]) - 1;

      for (let i: number = 0; i < count; i++) {
        staples2[staples.length].unshift(staples2[startIndex].shift());
        staples[endIndex].unshift(staples[startIndex].shift());
      }
      for (let i: number = 0; i < count; i++) {
        staples2[endIndex].unshift(staples2[staples.length].shift());
      }
    }

    return [
      staples
        .map((stack) => stack[0])
        .join('')
        .replace(/[\[\]]/g, ''),
      staples2
        .map((stack) => stack[0])
        .join('')
        .replace(/[\[\]]/g, ''),
    ];
  }
}
