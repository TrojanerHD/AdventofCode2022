import { Response } from '..';
import Day from '../day';

export default class Day15 implements Day {
  main(data: string): Response {
    const lines = data.split('\n');
    const sensors = [];
    const beacons = [];
    let lowX = Infinity;
    let highX = -Infinity;
    for (const line of lines) {
      const instructions = line.split(/[ =,:]/);
      const x = Number(instructions[3]);
      const y = Number(instructions[6]);

      const beaconX = Number(instructions[13]);
      const beaconY = Number(instructions[16]);

      const distance = Math.abs(x - beaconX) + Math.abs(y - beaconY);

      lowX = Math.min(lowX, x - distance);
      highX = Math.max(highX, x + distance);

      sensors.push({ x, y, distance });
      beacons.push({ x: beaconX, y: beaconY });
    }

    let blocked = 0;
    const y = 2_000_000;
    for (let x = lowX; x < highX; x++) {
      for (const sensor of sensors) {
        if (
          this.inReach(x, y, sensor) &&
          !beacons.some((beacon) => beacon.x === x && beacon.y === y)
        ) {
          blocked++;
          break;
        }
      }
    }

    let notCovered = { x: NaN, y: NaN };
    let found = false;
    for (let x = 0; x <= 4_000_000; x++) {
      if (found) break;

      for (let y = 0; y <= 4_000_000; y++) {
        for (const sensor of sensors) {
          if (this.inReach(x, y, sensor))
            y = sensor.y + sensor.distance - Math.abs(x - sensor.x);
        }
				if (y > 4_000_000) continue;
        if (
          sensors.every((sensor) => !this.inReach(x, y, sensor)) &&
          !beacons.some((beacon) => beacon.x === x && beacon.y === y)
        ) {
          notCovered = { x, y };
          found = true;
          break;
        }
      }
    }

    return [blocked, notCovered.x * 4_000_000 + notCovered.y];
  }

  private inReach(
    x: number,
    y: number,
    sensor: { x: number; y: number; distance: number }
  ): boolean {
    return (
      x >= sensor.x - sensor.distance + Math.abs(y - sensor.y) &&
      x <= sensor.x + sensor.distance - Math.abs(y - sensor.y) &&
      y >= sensor.y - sensor.distance + Math.abs(x - sensor.x) &&
      y <= sensor.y + sensor.distance - Math.abs(x - sensor.x)
    );
  }
}
