import { Injectable } from '@angular/core';
import { DrawMode } from '../interfaces/draw-mode';
import { ConsoleDataService } from '../console-display/console-data.service';

// The mode for moving through the drawing

@Injectable()
export class ScrollService implements DrawMode {

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
      ox -= 2;
    }
    if (key === 'ArrowRight') {
      ox += 2;
    }
    this.consoleData.offset = [ox, oy];
  }

}
