import { Injectable } from '@angular/core';
import {DrawMode} from '../../interfaces/draw-mode';
import {ConsoleDataService} from '../../console-display/console-data.service';
import {PixelDrawCursorService} from './pixel-draw-cursor.service';
import {ControlsService} from '../../services/controls.service';
import {ColorChangeService} from '../../color-changer/color-change.service';
import { acs } from '../../misc/acs';

@Injectable()
export class PixelDrawModeService implements DrawMode {

  constructor(private consoleData: ConsoleDataService, private pixelcurs: PixelDrawCursorService,
              private controls: ControlsService, private colors: ColorChangeService) { }
  handle(event) {
    let cell = [0, 0]; // The content of the current cell, first is up second is down in colors.
    if (this.consoleData.char_at(this.pixelcurs.x, this.pixelcurs.y)) {
      // Analyze the curent char
      const char = this.consoleData.get_char(this.pixelcurs.x, this.pixelcurs.y);
      if (char.ch === acs.fullblock) {
        cell = [char.fg, char.fg];
      }
      if (char.ch === ' ') {
        cell = [char.bg, char.bg];
      }
      if (char.ch === acs.uhalfblock) {
        cell = [char.fg, char.bg];
      }
    }
    if (event.key === this.controls.draw) {
      if (this.pixelcurs.up) {
        cell[0] = this.colors.fg;
      } else {
        cell[1] = this.colors.fg;
      }
    }
    if (event.key === 'Backspace') {
      if (this.pixelcurs.up) {
        cell[0] = 0;
      } else {
        cell[1] = 0;
      }
    }
    // Treat some special cases
    if (cell[0] === cell[1]) {
      if (cell[0] !== 0) {
        // The top and bottom part are the same, we add a full block
        this.consoleData.add_char(this.pixelcurs.x, this.pixelcurs.y, acs.fullblock, this.colors.fg, 0);
      } else {
        this.consoleData.remove_char(this.pixelcurs.x, this.pixelcurs.y);
      }
    } else {
        this.consoleData.add_char(this.pixelcurs.x, this.pixelcurs.y, acs.uhalfblock, cell[0], cell[1]);
      }
    }
}
