import * as fs from 'fs';

export type Response = Array<{ message: string; value: string }> | undefined;

class Day {
  static readonly #year: string = '2022';
  #day: string;

  constructor(day: number) {
    this.#day = day.toString();
    if (day <= 9) this.#day = `0${this.#day}`;
  }

  async start(): Promise<void> {
    const data: string = fs.readFileSync(
      `./src/${Day.#year}/${this.#day}/values.txt`,
      'utf8'
    );
    process.chdir(`./src/${Day.#year}/${this.#day}`);

    const callbackFunction: { main: (data: string) => Response } = await import(
      `./${Day.#year}/${this.#day}/index`
    );

    const toLog: Response = callbackFunction.main(data);

    process.chdir('../../');
    if (!toLog) return;
    for (let i = 0; i < toLog.length; i++) {
      const log = toLog[i];
      this.logger(i + 1, log.message, log.value);
    }
  }

  private logger(part: number, message: string, value: string): void {
    console.log(
      `[Year ${Day.#year}, Day ${this.#day}, Part ${part}] ${message}: ${value}`
    );
  }
}

async function main() {
  for (const arg of process.argv.filter((_, i): boolean => i > 1)) {
    if (!isNaN(Number(arg))) await new Day(Number(arg)).start();
    else console.error(`Parameter ${arg} is not a number`);
  }
}

main();
