import { Injectable } from '@angular/core';
import { DrawMode } from '../interfaces/draw-mode';
import { ConsoleDataService } from '../console-display/console-data.service';

// This service simply holds the cursor's x and y.

@Injectable()
export class CursorService implements DrawMode {
  x = 0;
  y = 0;
  visible = 1;
  active = true;
  constructor(private consoleData: ConsoleDataService) { }

  handle(event) {
    const key = event.key;
    console.log(key);
    if (key === 'ArrowLeft') {
      this.x = this.x === 0 ? 0 : this.x - 1;
    }
    if (key === 'ArrowRight') {
      this.x = this.x + 1 === this.consoleData.width ? this.x : this.x + 1;
    }
    if (key === 'ArrowUp') {
      this.y = this.y === 0 ? 0 : this.y - 1;
    }
    if (key === 'ArrowDown') {
      this.y = this.y + 1 === this.consoleData.height ? this.y : this.y + 1;
    }
    // If we moved the cursor, we make it visible again so the user can see it when it goes
    if (key.startsWith('Arrow')) {
      this.visible = 1;
    }
  }
  checkCursorOutOfBounds() {
    // Checks if the cursor is outside the bounds of the console and repositions it if true
    if (this.x + 1 > this.consoleData.width) {
      this.x = this.consoleData.width - 1;
    }
    if (this.y + 1 > this.consoleData.height) {
      this.y = this.consoleData.height - 1;
    }
  }

}
