import { Injectable } from '@angular/core';
import { DrawMode } from '../interfaces/draw-mode';
import { ConsoleDataService } from '../console-display/console-data.service';
import { CursorService } from '../cursor/cursor.service';
import { ColorChangeService } from '../color-changer/color-change.service';
import {ModesStatusProviderService} from "../modes-manager/modes-status-provider.service";

// The mode for typing plain text

@Injectable()
export class TextService implements DrawMode {

  constructor(private consoleData: ConsoleDataService, private curs: CursorService,
              private colors: ColorChangeService, private modesStatus: ModesStatusProviderService) {}
  handle(event) {
    // Just add normal characters to the console and move the cursor to the left after
    const key = event.key;
    let ax; // The value that will be aded to the cursor's x
    if (key.length === 1 || key === 'Backspace') {
      // Regular visible char
      if (key === 'Backspace') {
        // Remove char and back off
        this.consoleData.remove_char(this.curs.x, this.curs.y);
        ax = -1;
      } else {
        // Add the char and advance
        this.consoleData.add_char(this.curs.x, this.curs.y, key, this.colors.fg, this.colors.bg);
        ax = 1;
      }

      if (this.curs.x + 1 === this.consoleData.width && key.length === 1) {
        // We are at the right edge and typing, we move the whole drawing, not the cursor
        ax = 0;
        this.consoleData.offset[0]--;
      }
      if (this.curs.x === 0 && key === 'Backspace') {
        // We are at the beggining of the console and deleting, move the drawing instead
        ax = 0;
        this.consoleData.offset[0]++;
      }
      // Finally move the cursor if needed
      this.curs.x += ax;
    }
    if (key === 'Enter') {
      // We restore the normal mode
      this.modesStatus.normalMode();
    }
  }

}
