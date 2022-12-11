import Day from '../day';
import { Response } from '../index';

class Monkey {
  _id: number;
  _items: number[] = [];
  _operation: (old: number) => number;
  _divisor: number;
  _true: number;
  _false: number;
  _itemsInspected = 0;
  _trueMonkey: Monkey;
  _falseMonkey: Monkey;

  constructor(id: number) {
    this._id = id;
  }
}

export default class Day11 implements Day {
  main(data: string): Response {
    console.log(
      'Note: This day only runs using Node due to the incompleteness of Bun'
    );
    console.log('On my machine, the debugger is very slow, so I would recommend to not use the debugger and executing the command by hand')
    const lines = data.split('\n');
    const monkeys: Monkey[] = [];
    for (let line of lines) {
      // Case: Monkey end
      if (line === '') {
        continue;
      }

      // Case: Monkey init
      if (!line.startsWith('  ')) {
        monkeys.push(new Monkey(Number(line.replace(/Monkey (\d*):/, '$1'))));
        continue;
      }

      // Case: Monkey info
      line = line.replace(/^ */, '');
      if (line.startsWith('Starting items: ')) {
        const newItems = line
          .replace('Starting items: ', '')
          .split(', ')
          .map((item: string): number => Number(item));

        monkeys[monkeys.length - 1]._items.push(...newItems);
        continue;
      }

      if (line.startsWith('Operation: ')) {
        monkeys[monkeys.length - 1]._operation = (old: number) =>
          eval(`${old}${line.replace('Operation: new = old', '')}`);
        continue;
      }

      const split = line.split(' ');
      const last = Number(split[split.length - 1]);
      if (line.startsWith('Test: ')) {
        monkeys[monkeys.length - 1]._divisor = last;
        continue;
      }

      if (line.startsWith('If true')) {
        monkeys[monkeys.length - 1]._true = last;
        continue;
      }
      monkeys[monkeys.length - 1]._false = last;
    }

    const monkeysPartTwo: Monkey[] = [];
    let leastCommon = 1;
    for (const monkey of monkeys) {
      const newMonkey = new Monkey(monkey._id);
      newMonkey._divisor = monkey._divisor;
      newMonkey._false = monkey._false;
      newMonkey._items = [...monkey._items];
      newMonkey._operation = monkey._operation;
      newMonkey._true = monkey._true;
      monkeysPartTwo.push(newMonkey);
      leastCommon = this.lcm_two_numbers(leastCommon, newMonkey._divisor);
    }
    for (const monkey of monkeysPartTwo) {
      monkey._trueMonkey = monkeysPartTwo.find(
        (newMonkey) => newMonkey._id === monkey._true
      );
      monkey._falseMonkey = monkeysPartTwo.find(
        (newMonkey) => newMonkey._id === monkey._false
      );
    }

    for (let i = 0; i < 20; i++) {
      for (const monkey of monkeys) {
        for (let j = 0; j < monkey._items.length; j++) {
          monkey._itemsInspected++;
          monkey._items[j] = monkey._operation(monkey._items[j]);
          monkey._items[j] = Math.floor(monkey._items[j] / 3);
          let divisible = monkey._items[j] % monkey._divisor === 0;

          const nextMonkey = monkeys.find(
            (newMonkey) =>
              newMonkey._id === (divisible ? monkey._true : monkey._false)
          );
          nextMonkey._items.push(monkey._items[j]);
        }

        monkey._items = [];
      }
    }

    for (let i = 0; i < 10_000; i++) {
      for (const monkey of monkeysPartTwo) {
        for (let j = 0; j < monkey._items.length; j++) {
          monkey._itemsInspected++;
          monkey._items[j] = monkey._operation(monkey._items[j]);
          const nextMonkey =
            monkey._items[j] % monkey._divisor === 0
              ? monkey._trueMonkey
              : monkey._falseMonkey;

          while (monkey._items[j] - leastCommon >= 0)
            monkey._items[j] -= leastCommon;
          nextMonkey._items.push(monkey._items[j]);
        }

        monkey._items = [];
      }
    }
    const firstTwo = monkeys
      .sort((a, b) => b._itemsInspected - a._itemsInspected)
      .slice(0, 2);
    const firstTwoPartTwo = monkeysPartTwo
      .sort((a, b) => b._itemsInspected - a._itemsInspected)
      .slice(0, 2);
    return [
      firstTwo.reduce((a, b) => a * b._itemsInspected, 1),
      firstTwoPartTwo.reduce((a, b) => a * b._itemsInspected, 1),
    ];
  }

  // https://www.w3resource.com/javascript-exercises/javascript-math-exercise-10.php
  private lcm_two_numbers(x, y) {
    return !x || !y ? 0 : Math.abs((x * y) / this.gcd_two_numbers(x, y));
  }

  private gcd_two_numbers(x, y) {
    x = Math.abs(x);
    y = Math.abs(y);
    while (y) {
      var t = y;
      y = x % y;
      x = t;
    }
    return x;
  }
}
