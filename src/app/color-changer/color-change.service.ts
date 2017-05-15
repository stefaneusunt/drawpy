import { Injectable } from '@angular/core';
import { DrawMode } from '../interfaces/draw-mode';

@Injectable()
export class ColorChangeService implements DrawMode {
  active = true;
  fg = 7;
  bg = 0;
  constructor() { }

  handle(event) {
    const key = event.key;
    if (key === 'c' && event.getModifierState('Control')) {
      event.preventDefault();
      this.fg = (this.fg + 1) % 16;
    }
    if (key === 'x' && event.getModifierState('Control')) {
      event.preventDefault();
      this.bg = (this.bg + 1) % 16;
    }
  }

}
