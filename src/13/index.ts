import { Response } from '..';
import Day from '../day';

export default class Day13 implements Day {
  main(data: string): Response {
    const lines = data.split('\n');
    let indices = [];
    let index = 1;
    for (let i = 0; i < lines.length - 1; i += 3) {
      const first = JSON.parse(lines[i]);
      const second = JSON.parse(lines[i + 1]);
      const comp = this.comparison(first, second);
      if (comp.rightOrder) indices.push(index);
      index++;
    }

    const packets = lines.filter((value) => value !== '');
    packets.push('[[2]]');
    packets.push('[[6]]');

    const newOrder = [];
    while (newOrder.length < packets.length) newOrder.push(undefined);

    for (let i = 0; i < packets.length; i++) {
      let newIndex = 0;
      while (newOrder[newIndex] !== undefined) newIndex++;

      for (let j = i + 1; j < packets.length; j++) {
        const comp = this.comparison(
          JSON.parse(packets[i]),
          JSON.parse(packets[j])
        );
        if (comp.wrongOrder || !comp.rightOrder) {
          newIndex++;
          while (newOrder[newIndex] !== undefined) newIndex++;
        }
      }

      newOrder[newIndex] = packets[i];
    }
    return [
      indices.reduce((a, b) => a + b),
      (newOrder.findIndex((value) => value === '[[2]]') + 1) *
        (newOrder.findIndex((value) => value === '[[6]]') + 1),
    ];
  }

  private comparison(
    first: any[],
    second: any[],
    i: number = 0,
    result1: number = 0
  ): { rightOrder: boolean; result1: number; wrongOrder: boolean } {
    if (first.length === 0 && second.length === 0) {
      return { rightOrder: false, result1, wrongOrder: false };
    }
    if (first.length === 0) {
      result1++;
      return { rightOrder: true, result1, wrongOrder: false };
    }
    if (second.length === 0) {
      return { rightOrder: false, result1, wrongOrder: true };
    }
    if (i > first.length - 1 && i <= second.length - 1) {
      result1++;
      return { rightOrder: true, result1, wrongOrder: false };
    }

    if (i > second.length - 1)
      return { rightOrder: false, result1, wrongOrder: false };

    if (Number.isFinite(first[i]) && Number.isFinite(second[i])) {
      if (Number(first[i]) < Number(second[i])) {
        result1++;
        return { rightOrder: true, result1, wrongOrder: false };
      }
      if (Number(first[i] > Number(second[i]))) {
        return { rightOrder: false, result1, wrongOrder: true };
      }
      i++;

      return this.comparison(first, second, i, result1);
    }

    if (Array.isArray(first[i]) && Array.isArray(second[i])) {
      const comp = this.comparison(first[i], second[i], result1);
      if (comp.rightOrder) {
        result1++;
        return { rightOrder: true, result1, wrongOrder: false };
      }

      if (comp.wrongOrder) {
        return { rightOrder: false, result1, wrongOrder: true };
      }

      if (first[i].length < second[i].length) {
        result1++;
        return { rightOrder: true, result1, wrongOrder: false };
      }
      if (first[i].length > second[i].length) {
        return { rightOrder: false, result1, wrongOrder: true };
      }
      i++;
      return this.comparison(first, second, i, result1);
    }

    if (Number.isFinite(first[i]) && Array.isArray(second[i])) {
      first[i] = [first[i]];
      return this.comparison(first, second, i, result1);
    }

    second[i] = [second[i]];
    return this.comparison(first, second, i, result1);
  }
}
