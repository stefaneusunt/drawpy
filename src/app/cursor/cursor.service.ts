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
    const key2mov = {'ArrowLeft': [-1, 0], 'ArrowRight': [1, 0], 'ArrowUp': [0, -1], 'ArrowDown': [0, 1]};
    if (key.startsWith('Arrow')) {
      // Reset the blink when cursor moves (visibility)
      this.visible = 1;
      this.move(this.x + key2mov[key][0], this.y + key2mov[key][1]);
    }
  }
  move(x: number, y: number): boolean {
    // Move the cursor to the given coordinates, doing nothing if the coordinates are invalid
    // It returns if the cursor was moved or not
    if ((x < 0 || x >= this.consoleData.width) || (y < 0 || y >= this.consoleData.height)) {
      return false;
    }
    this.x = x;
    this.y = y;
    return true;
  }
  pos(): [number, number] {
    // Returns a list with the x,y of the cursor
    return [this.x, this.y];
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
