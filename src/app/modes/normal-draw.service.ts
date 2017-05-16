import { Injectable } from '@angular/core';
import { DrawMode } from '../interfaces/draw-mode';
import { CursorService } from '../cursor/cursor.service';
import { ConsoleDataService } from '../console-display/console-data.service';
import {ColorChangeService} from '../color-changer/color-change.service';

// The normal drawing mode with the space bar

@Injectable()
export class NormalDrawService implements DrawMode {
  active = true;
  draw_chars = ['\u2588', '\u2593', '\u2592', '\u2591', ' '];
  draw_char_index = 2;
  constructor(private cursServ: CursorService, private charsServ: ConsoleDataService,
              private colorchangeServ: ColorChangeService) { }

  handle(event) {
    const key = event.key;
    if (key === ' ') {
      // We draw a character at the current location
      this.charsServ.add_char(this.cursServ.x, this.cursServ.y, this.draw_chars[this.draw_char_index],
        this.colorchangeServ.fg, this.colorchangeServ.bg);
    }
    if (key === 'Backspace') {
      event.preventDefault();
      this.charsServ.remove_char(this.cursServ.x, this.cursServ.y);
    }
    if (key === 'v') {
      event.preventDefault();
      this.draw_char_index = (this.draw_char_index + 1) % this.draw_chars.length;
    }
  }

}
