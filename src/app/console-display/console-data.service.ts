import { Injectable } from '@angular/core';
import { Char } from '../data-models/char';

// This service will hold all the display data(characters with their x, y, color etc)

@Injectable()
export class ConsoleDataService {

  offset = [0, 0];
  chars: { [pos: string]: Char } = {}; // 'x_y' -> Char
  constructor() { }

  xy2str(x, y) {
    return `${x + this.offset[0]}_${y + this.offset[1]}`;
  }

  add_char(x, y, char, fg, bg) {
    // It's kinda intuitive isn't it
    this.chars[this.xy2str(x, y)] = {ch: char, fg: fg, bg: bg};
  }
  get_char(x, y) {
    // Returns the Char object at the requested pos, or undefined if there is none
    return this.chars[this.xy2str(x, y)];
  }
  remove_char(x, y) {
    // Removes the char at the given coordinates, does nothing if there is no char at coords
    delete this.chars[this.xy2str(x, y)];
  }
}
