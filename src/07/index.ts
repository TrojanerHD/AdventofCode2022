import Day from '../day';
import { Response } from '../index';

class File {
  _directory: boolean;
  _size: number;
  _name: string;
  _parent?: File;
  _content: File[] = [];

  constructor(
    name: string,
    directory: boolean,
    size: number,
    parent?: File,
    content: File[] = []
  ) {
    this._directory = directory;
    this._size = size;
    this._name = name;
    this._parent = parent;
    this._content = content;
  }

  addSize(size: number): void {
    if (this._parent) this._parent.addSize(size);

    this._size += size;
  }

  getSizeOfMaxSize(size: number): number {
    let calculatedSize = 0;
    for (const file of this._content) {
      if (file._directory) {
        calculatedSize += file.getSizeOfMaxSize(size);
      }
    }

    if (this._size <= size) calculatedSize += this._size;
    return calculatedSize;
  }

  getDirectoriesOfMinSize(size: number): File[] {
    let files: File[] = [];
    for (const file of this._content) {
      if (file._directory && file._size >= size) {
        files.push(...file.getDirectoriesOfMinSize(size));
      }
    }

    if (this._size >= size) files.push(this);
    return files;
  }
}

export default class Day07 implements Day {
  main(data: string): Response {
    const split = data.split('\n');
    const root = new File('/', true, 0);
    let currentDir = root;
    let ls = false;
    for (const line of split) {
      if (line.startsWith('$ ')) {
        ls = false;
        const command = line.replace(/^\$ /, '').split(' ');
        switch (command[0]) {
          case 'cd':
            switch (command[1]) {
              case '/':
                currentDir = root;
                break;
              case '..':
                currentDir = currentDir._parent;
                break;
              default:
                currentDir = currentDir._content.find(
                  (dir) => dir._name === command[1]
                );
                break;
            }
            break;
          case 'ls':
            ls = true;
            break;
        }
        continue;
      }

      if (ls) {
        const info = line.split(' ');
        const dir = info[0] === 'dir';
        currentDir._content.push(
          new File(info[1], dir, dir ? 0 : Number(info[0]), currentDir)
        );
        if (!dir) currentDir.addSize(Number(info[0]));
      }
    }
    return [
      root.getSizeOfMaxSize(100000),
      root
        .getDirectoriesOfMinSize(30000000 - 70000000 + root._size)
        .sort((a: File, b: File) => a._size - b._size)[0]._size,
    ];
  }
}
