import Day from '../day';
import { Response } from '../index';

export default class Day03 implements Day {
  main(data: string): Response {
    const split: string[] = data.split('\n');
    let result1: number = 0;
    let result2: number = 0;
    for (const line of split) {
      const rucksack1: string = line.slice(0, line.length / 2);
      const rucksack2: string = line.slice(line.length / 2);

      const item: string = this.checkTwoRucksacks(rucksack1, rucksack2).split(
        ''
      )[0];
      result1 += this.calculateItem(item);
    }
    for (let i: number = 0; i < split.length; i += 3) {
      const rucksacks: string[] = [split[i], split[i + 1], split[i + 2]];
      const item: string = this.determineItems(rucksacks)[0];
      result2 += this.calculateItem(item);
    }
    return [result1, result2];
  }

  private determineItems(rucksacks: string[]): string {
    let lastItems: string = rucksacks[0];
    for (let i: number = 1; i < rucksacks.length; i++) {
      lastItems = this.checkTwoRucksacks(lastItems, rucksacks[i]);
    }
    return lastItems;
  }

  private checkTwoRucksacks(rucksack1: string, rucksack2: string): string {
    const items: string[] = [];
    for (const item of rucksack1.split('')) {
      if (rucksack2.split('').some((item2) => item === item2)) {
        if (!items.includes(item)) items.push(item);
      }
    }
    return items.join('');
  }

  private calculateItem(item: string): number {
    let subtract: number = 96;
    if (item === item.toUpperCase()) subtract = 38;
    return item.charCodeAt(0) - subtract;
  }
}
