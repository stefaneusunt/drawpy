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

  // Modified status for enabling/disablig the save button
  modified = false;

  constructor() { }

  xy2str(x, y) {
    return `${x - this.offset[0]}_${y - this.offset[1]}`;
  }
  str2xy(s) {
    return s.split('_').map((x) => parseInt(x));
  }

  add_char(x, y, char, fg, bg) {
    // When adding a char the offset must be substracted, not added to the coords
    this.chars[this.xy2str(x, y)] = {ch: char, fg: fg, bg: bg};
    this.modified = true;
  }
  remove_char(x, y) {
    // Removes the char at the given coordinates, does nothing if there is no char at coords
    delete this.chars[this.xy2str(x, y)];
    this.modified = true;
  }
  char_at(x, y) {
    // Returns whether there is a char at x,y
    return Boolean(this.chars[this.xy2str(x, y)]);
    }
  get_char(x, y): Char {
    // Return the char at the given coords
    return this.chars[this.xy2str(x, y)];
  }
  min_xy() {
    // Return the minimum coordinates as [x, y]
    if (Object.keys(this.chars).length === 0) {
      throw new ReferenceError('Cannot get minimum xy, the console is empty!');
    }
    let [minx, miny] = this.str2xy(Object.keys(this.chars)[0]);
    for (const xystr of Object.keys(this.chars)) {
      const [cx, cy] = this.str2xy(xystr);
      if (cx < minx ) { minx = cx; }
      if (cy < miny ) { miny = cy; }
    }
    return [minx, miny];
  }
  max_xy() {
    // Return the maximum coords as [x, y]
    if (Object.keys(this.chars).length === 0) {
      throw new ReferenceError('Cannot get maximum xy, the console is empty!');
    }
    let [maxx, maxy] = this.str2xy(Object.keys(this.chars)[0]);
    for (const xystr of Object.keys(this.chars)) {
      const [cx, cy] = this.str2xy(xystr);
      if (cx > maxx ) { maxx = cx; }
      if (cy > maxy ) { maxy = cy; }
    }
    return [maxx, maxy];
  }
}
