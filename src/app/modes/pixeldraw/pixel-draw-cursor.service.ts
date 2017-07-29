import { Injectable } from '@angular/core';
import {DrawMode} from '../../interfaces/draw-mode';
import {ConsoleDataService} from "../../console-display/console-data.service";

@Injectable()
export class PixelDrawCursorService implements DrawMode {

  x = 0;
  y = 0;
  up = 1;
  enabled = false;
  visible = 1;
  constructor(private consoleData: ConsoleDataService) { }
  handle(event) {
    const key = event.key;
    const [cx, cy, cup] = [this.x, this.y, this.up];
    if (key === 'ArrowDown') {
      if (this.up) {
        this.up = 0;
      } else if (this.y + 1 !== this.consoleData.height) {
        this.y++;
        this.up = 1;
      }
    }
    if (key === 'ArrowUp') {
      if (!this.up) {
        this.up = 1;
      } else if (this.y !== 0) {
        this.y--;
        this.up = 0;
      }
    }
    this.x += (key === 'ArrowLeft' && this.x !== 0) ? -1 : 0;
    this.x += (key === 'ArrowRight' && this.x + 1 !== this.consoleData.width) ? 1 : 0;
    if (!(this.x === cx && this.y === cy && this.up === cup)) {
      this.visible = 1;
    }
  }
  disable() { this.enabled = false; }
  enable()  { this.enabled = true;  }
}
