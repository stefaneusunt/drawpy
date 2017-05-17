import { Injectable } from '@angular/core';
import { CursorService } from '../cursor/cursor.service';
import { NormalDrawService } from '../modes/normal-draw.service';
import { ColorChangeService } from '../color-changer/color-change.service';
import { ScrollService } from '../modes/scroll.service';
import { handleModesSwitches } from './modes-switcher';

@Injectable()
export class ModesManagerService {

  // These "private" vars should have intuitive names, as they are used to
  // activate/deactivate individual modes
  constructor(private cursor_movement: CursorService, private normal_mode: NormalDrawService,
              private colorChange: ColorChangeService,
              private scrolling_mode: ScrollService) { }

  handleKey(event) {
    for (const serv of Object.keys(this)) {
      handleModesSwitches(this, event);
      if (this[serv].active) {
        event.preventDefault();
        this[serv].handle(event);
      }
    }
  }
  deactivateAll() {
    // Deactivate all modes
    for (const mode of Object.keys(this)) {
      if (mode !== 'colorChange') {
        // The color changer should always work
        this[mode].active = false;
      }

    }
  }
  activate(modes: string[]) {
    // Activate the modes given in the list
    // The names are the variable names in constructor in this file
    for (const mode of modes) {
      if (this[mode] == undefined) {
        throw ReferenceError(`No such mode available: '${mode}'!`);
      }
      this[mode].active = true;
    }
  }
  isActive(mode: string) {
    if (this[mode] == undefined) {
      throw ReferenceError(`No such mode available: '${mode}'!`);
    }
    return this[mode].active;
  }
}
