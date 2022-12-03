import Day from '../day';
import { Response } from '../index';

export default class Day03 implements Day {
  main(data: string): Response {
    const split = data.split('\n');
    let result1 = 0;
    let result2 = 0;
    for (const line of split) {
      const rucksack1 = line.slice(0, line.length / 2);
      const rucksack2 = line.slice(line.length / 2);

      const item = this.checkTwoRucksacks(rucksack1, rucksack2).split('')[0];
      result1 += this.calculateItem(item);
    }
    for (let i = 0; i < split.length; i += 3) {
      const rucksacks = [split[i], split[i + 1], split[i + 2]];
      const item = this.determineItems(rucksacks)[0];
      result2 += this.calculateItem(item);
    }
    return [result1, result2];
  }

  private determineItems(rucksacks: string[]) {
    let lastItems = rucksacks[0];
    for (let i = 1; i < rucksacks.length; i++) {
      lastItems = this.checkTwoRucksacks(lastItems, rucksacks[i]);
    }
    return lastItems;
  }

  private checkTwoRucksacks(rucksack1: string, rucksack2: string): string {
    const items = [];
    for (const item of rucksack1.split('')) {
      if (rucksack2.split('').some((item2) => item === item2)) {
        if (!items.includes(item)) items.push(item);
      }
    }
    return items.join('');
  }

  private calculateItem(item: string): number {
    let subtract = 96;
    if (item === item.toUpperCase()) subtract = 38;
    return item.charCodeAt(0) - subtract;
  }
}
