import { Injectable } from '@angular/core';
import { DrawMode } from '../interfaces/draw-mode';
import { ConsoleDataService } from '../console-display/console-data.service';

// The mode for moving through the drawing

@Injectable()
export class ScrollService implements DrawMode {

  active = false;
  constructor(private consoleData: ConsoleDataService) { }
  handle(event) {
    const key = event.key;
    let [ox, oy] = this.consoleData.offset;
    if (key === 'ArrowUp') {
      oy--;
    }
    if (key === 'ArrowDown') {
      oy++;
    }
    if (key === 'ArrowLeft') {
      ox--;
    }
    if (key === 'ArrowRight') {
      ox++;
    }
    this.consoleData.offset = [ox, oy];
  }

}
