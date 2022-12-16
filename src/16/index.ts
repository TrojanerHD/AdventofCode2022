import { Response } from '..';
import Day from '../day';

interface Valve {
  name: string;
  rate: number;
  otherValveNames: string[];
  otherValves: Valve[];
  open: boolean;
  visited: { valve: Valve; pressure: number }[];
}

export default class Day16 implements Day {
  main(data: string): Response {
    const lines = data.split('\n');
    const valves: Valve[] = [];
    for (const line of lines) {
      const instructions = line.split(/[ =,;]/);
      const valve: Valve = {
        name: instructions[1],
        rate: Number(instructions[5]),
        otherValveNames: instructions.slice(11).filter((value) => value !== ''),
        otherValves: [],
        open: false,
        visited: [],
      };
      valves.push(valve);
    }

    for (let i = 0; i < valves.length; i++) {
      for (const name of valves[i].otherValveNames)
        valves[i].otherValves.push(valves.find((valve) => valve.name === name));
    }

    const start = valves.find((valve) => valve.name === 'AA');
    const result1 = this.handleValve(start, 30);
    return [result1];
  }

  private handleValve(valve: Valve, i: number, pressure = 0) {
    i--;
    if (i <= 0) return pressure;
    const tempPressuresOpen = [];
    const tempPressuresNoOpen = [];
    if (valve.rate !== 0 && !valve.open) {
      valve.open = true;
      let pressureNoOpen = pressure;
      for (const nextValve of valve.otherValves.filter(
        (nextValve) =>
          !valve.visited.some((valve) => valve.valve.name === nextValve.name)
      )) {
        valve.visited.push({ valve: nextValve, pressure: 0 });
        const nextPressure = this.handleValve(nextValve, i, pressure);
        tempPressuresNoOpen.push(nextPressure);
        valve.visited.find(
          (valve) => valve.valve.name === nextValve.name
        ).pressure = nextPressure;
      }
      if (tempPressuresNoOpen.length !== 0)
        pressureNoOpen += tempPressuresNoOpen.sort((a, b) => b - a)[0];
      pressure += valve.rate * i;
      i--;
      if (i <= 0) return Math.max(pressure, pressureNoOpen);

      for (const nextValve of valve.otherValves) {
        const nextPressure = this.handleValve(nextValve, i, pressure);
        tempPressuresOpen.push(nextPressure);
      }
      if (tempPressuresOpen.length !== 0)
        pressure += tempPressuresOpen.sort((a, b) => b - a)[0];
      return Math.max(pressure, pressureNoOpen);
    }
    for (const nextValve of valve.otherValves.filter(
      (nextValve) =>
        !valve.visited.some((valve) => valve.valve.name === nextValve.name)
    )) {
      valve.visited.push({ valve: nextValve, pressure: 0 });
      const nextPressure = this.handleValve(nextValve, i, pressure);
      tempPressuresNoOpen.push(nextPressure);
      valve.visited.find(
        (valve) => valve.valve.name === nextValve.name
      ).pressure = nextPressure;
    }
    if (tempPressuresNoOpen.length !== 0)
      return pressure + tempPressuresNoOpen.sort((a, b) => b - a)[0];
    else return pressure;
  }
}
