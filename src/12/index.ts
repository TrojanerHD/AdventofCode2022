import Day from '../day';
import { Response } from '../index';
import Graph from 'node-dijkstra';

interface Coordinate {
  x: number;
  y: number;
}

export default class Day11 implements Day {
  #grid: number[][] = [];
  #graph = new Graph();

  main(data: string): Response {
    const lines = data.split('\n');
    let start: Coordinate;
    let end: Coordinate;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      this.#grid.push(
        line
          .split('')
          .map((value) =>
            value === 'S'
              ? Infinity
              : (value === 'E' ? 'z' : value).charCodeAt(0) - 'a'.charCodeAt(0)
          )
      );
      const possibleStart = line.split('').findIndex((value) => value === 'S');
      if (possibleStart !== -1) start = { y: i, x: possibleStart };

      const possibleEnd = line.split('').findIndex((value) => value === 'E');
      if (possibleEnd !== -1) end = { y: i, x: possibleEnd };
    }

    for (let y = 0; y < this.#grid.length; y++) {
      for (let x = 0; x < this.#grid[y].length; x++)
        this.determineNeighbors(x, y);
    }

    const path = (this.#graph as any).shortestPath(
      `${start.x},${start.y}`,
      `${end.x},${end.y}`
    );
    const paths: string[][] = [];
    for (let y = 0; y < this.#grid.length; y++) {
      for (let x = 0; x < this.#grid[y].length; x++) {
        if (this.#grid[y][x] === 0) {
          const path = (this.#graph as any).shortestPath(
            `${x},${y}`,
            `${end.x},${end.y}`
          );
          if (path) paths.push(path);
        }
      }
    }

    console.log(paths);

    const pathLengths = paths
      .map((value) => value.length - 1)
      .sort((a, b) => a - b);

    return [(path as string[]).length - 1, pathLengths[0]];
  }

  private determineNeighbors(x: number, y: number) {
    const neighbors = {};
    if (y > 0 && this.#grid[y - 1][x] <= this.#grid[y][x] + 1) {
      neighbors[`${x},${y - 1}`] = 1;
    }
    if (
      y < this.#grid.length - 1 &&
      this.#grid[y + 1][x] <= this.#grid[y][x] + 1
    ) {
      neighbors[`${x},${y + 1}`] = 1;
    }
    if (x > 0 && this.#grid[y][x - 1] <= this.#grid[y][x] + 1) {
      neighbors[`${x - 1},${y}`] = 1;
    }
    if (
      x < this.#grid[y].length - 1 &&
      this.#grid[y][x + 1] <= this.#grid[y][x] + 1
    ) {
      neighbors[`${x + 1},${y}`] = 1;
    }
    this.#graph.addNode(`${x},${y}`, neighbors);
  }
}
