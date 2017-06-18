import { Injectable } from '@angular/core';
import { DrawMode } from '../interfaces/draw-mode';
import { CursorService } from '../cursor/cursor.service';
import { ConsoleDataService } from '../console-display/console-data.service';
import {ColorChangeService} from '../color-changer/color-change.service';
import {ControlsService} from "../services/controls.service";

// The normal drawing mode with the space bar

@Injectable()
export class NormalDrawService implements DrawMode {

  draw_chars = ['\u2588', '\u2593', '\u2592', '\u2591', ' '];
  draw_char_index = 2;
  constructor(private cursServ: CursorService, private charsServ: ConsoleDataService,
              private colorchangeServ: ColorChangeService, private controls: ControlsService) { }

  handle(event) {
    const key = event.key;
    if (key === this.controls.draw) {
      // We draw a character at the current location
      this.charsServ.add_char(this.cursServ.x, this.cursServ.y, this.getDrawChar(),
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

  getDrawChar() {
    // Return the character that is currently used for drawing
    return this.draw_chars[this.draw_char_index];
  }

}
