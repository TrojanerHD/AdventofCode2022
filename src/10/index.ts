import Day from '../day';
import { Response } from '../index';

export default class Day10 implements Day {
  main(data: string): Response {
    const lines = data.split('\n');
    let x = 1;
    let cycle = 0;
    let nextCycle = false;
    let result1 = 0;
    let crt = 0;
    let pixels = [];
    for (const line of lines) {
      const instructions = line.split(' ');
      switch (instructions[0]) {
        case 'noop':
          cycle++;
          break;
        case 'addx':
          cycle++;
          nextCycle = true;
          break;
      }
      pixels.push(Math.abs((crt % 40) - x) <= 1);
      crt++;

      result1 += this.checkForCycle(cycle, x);
      if (nextCycle) {
        cycle++;
        result1 += this.checkForCycle(cycle, x);
        pixels.push(Math.abs((crt % 40) - x) <= 1);
        crt++;

        x += Number(instructions[1]);
        nextCycle = false;
      }
    }

    const rows: string[][] = [];
    for (let i = 0; i < pixels.length; i++) {
      if (!rows[Math.floor(i / 40)]) rows.push([]);
      rows[Math.floor(i / 40)].push(pixels[i] ? '#' : '.');
    }

    return [result1, `\n${rows.map((row) => row.join('')).join('\n')}`];
  }

  private checkForCycle(cycle: number, x: number): number {
    if ([20, 60, 100, 140, 180, 220].includes(cycle)) return cycle * x;
    return 0;
  }
}
