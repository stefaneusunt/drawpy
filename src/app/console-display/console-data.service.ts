import { Injectable } from '@angular/core';
import { Char } from '../data-models/char';

// This service will hold all the display data(characters with their x, y, color etc)
// and other info about the console element

@Injectable()
export class ConsoleDataService {

  offset = [0, 0];
  chars: { [pos: string]: Char } = {}; // 'x_y' -> Char

  // The width and height of the console in **characters**
  width = 0;
  height = 0;

  constructor() { }

  xy2str(x, y) {
    return `${x - this.offset[0]}_${y - this.offset[1]}`;
  }

  add_char(x, y, char, fg, bg) {
    // When adding a char the offset must be substracted, not added to the coords
    this.chars[this.xy2str(x, y)] = {ch: char, fg: fg, bg: bg};
  }
  remove_char(x, y) {
    // Removes the char at the given coordinates, does nothing if there is no char at coords
    delete this.chars[this.xy2str(x, y)];
  }
  char_at(x, y) {
    // Returns whether there is a char at x,y
    return Boolean(this.chars[this.xy2str(x, y)]);
    }
  get_char(x, y): Char {
    // Return the char at the given coords
    return this.chars[this.xy2str(x, y)];
  }
}
