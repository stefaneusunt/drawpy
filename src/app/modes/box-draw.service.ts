import { Injectable } from '@angular/core';
import { DrawMode } from '../interfaces/draw-mode';
import { CursorService } from '../cursor/cursor.service';
import { ConsoleDataService } from '../console-display/console-data.service';
import { ColorChangeService } from '../color-changer/color-change.service';
import { acs } from '../misc/acs';

// The box drawing mode (drawing stright lines with uncode box drawing characters)
// We will assume that any box drawing char is made up of 4 directions (segments starting from center):
//        UP
//
//        │
// LEFT ──┼── RIGHT
//        │
//
//       DOWN
// By making each segment appear or not, we can form all the caracters
// We use this convention to make an algorithm to blend them, together when needed
// Directions will be represented as string of the form udlr (up,down,left,right) made of 0's and 1's
// Ex: '1111' is ┼

const dir2char = {
  '0000': ' ',
  '1000': '\u2575',
  '1100': acs.vline,
  '0100': '\u2577',
  '0010': '\u2574',
  '0001': '\u2576',
  '0011': acs.hline,
  '1001': acs.llcorner,
  '1010': acs.lrcorner,
  '0101': acs.ulcorner,
  '0110': acs.urcorner,
  '0111': acs.ttee,
  '1011': acs.btee,
  '1101': acs.ltee,
  '1110': acs.rtee,
  '1111': acs.bigplus
};

function add_dirs(d1, d2) {
  // Combines 2 directions together
  const new_dir = [];
  for (let i = 0; i < 4; i++) {
    new_dir.push(d1[i] === d2[i] ? d1[i] : '1');
  }
  return new_dir.join('');
}

function reverse_dir(d) {
  // Return the direction rotated by 180 degrees
  return [d[1], d[0], d[3], d[2]].join('');
}

function contains_dir(bdir, sdir) {
  // Returns true if sdir is in bdir
  for (let i = 0; i < 4; i++) {
    if (sdir[i] === '1' && bdir[i] === '0') {
      return false;
    }
  }
  return true;
}

@Injectable()
export class BoxDrawService implements DrawMode {

  constructor(private cursorServ: CursorService, private charsData: ConsoleDataService,
              private colorChange: ColorChangeService) {}

  char2dir(x, y, fast_dir?) {
    // Return the direction string for the given char, analizing the surrounding characters if needed
    let ch = ' ';
    if (this.charsData.char_at(x, y)) {
      ch = this.charsData.get_char(x, y).ch;
    }
    let dir = '0000';
    for (const key in dir2char) {
      if (dir2char[key] === ch) {
        dir = key;
        break;
      }
    }
    // vline and hline are special cases as the character itself cannot store all the possible directions properly
    if (ch === acs.vline) { dir = '1100'; }
    if (ch === acs.hline) { dir = '0011'; }

    if (fast_dir) {
      return dir;
    }
    if (ch === acs.hline || ch === acs.vline) {
      let newdir = '0000'; // They have to be figured out
      const dirs = {'1000': [0, -1], '0100': [0, 1], '0010': [-1, 0], '0001': [1, 0]};
      for (const cdir in dirs) {
        const [ax, ay] = dirs[cdir];
        if (this.charsData.char_at(x + ax, y + ay)) {
          // There is a char nearby, its directions must be considered.
          // nearby char dir
          const ncdir = this.char2dir(x + ax, y + ay, true);
          if (contains_dir(dir, cdir) && contains_dir(ncdir, reverse_dir(cdir))) {
            newdir = add_dirs(newdir, cdir);
          }
        }
      }
      return newdir;

    } else {
      return dir;
    }
  }

  handle(event) {
    if (event.key.startsWith('Arrow')) {
      // We map the cursor offset to the pressed keys
      const [ox, oy] = this.cursorServ.pos();
      // Move the cursor (smart)
      this.cursorServ.handle(event);
      const pos = this.cursorServ.pos();
      if (pos[0] === ox && pos[1] === oy) {
        // Cursor is at the screen bounds, do nothing
        return;
      }
      const key2dir = {'ArrowUp': '1000', 'ArrowDown': '0100', 'ArrowLeft': '0010', 'ArrowRight': '0001'};
      const [fg, bg] = [this.colorChange.fg, this.colorChange.bg];

      // Add the key pressed dir to the previous character
      this.charsData.add_char(ox, oy, dir2char[add_dirs(this.char2dir(ox, oy), key2dir[event.key])], fg, bg);

      // Add the opposite of the pressed key dir to the current char
      this.charsData.add_char(pos[0], pos[1], dir2char[add_dirs(this.char2dir(pos[0], pos[1]), reverse_dir(key2dir[event.key]))], fg, bg);
    }
  }
}
