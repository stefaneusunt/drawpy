import { Injectable } from '@angular/core';
import { DrawMode } from '../interfaces/draw-mode';

@Injectable()
export class ColorChangeService implements DrawMode {
  active = true;
  fg = 7;
  bg = 0;
  fg_dialog_visible = false;
  bg_dialog_visible= false;
  constructor() { }

  handle(event) {
    const key = event.key;
    if (key === 'c' ) {
      event.preventDefault();
      this.fg_dialog_visible = true;
    }
    if (key === 'x') {
      event.preventDefault();
      this.bg_dialog_visible = true;
    }
  }

}
