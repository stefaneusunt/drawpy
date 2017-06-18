import { Injectable } from '@angular/core';

@Injectable()
export class ModesStatusProviderService {
  // mode var name -> active status
  modes = {
    cursor_movement: true,
    normal_mode: true,
    color_changer: true,
    scrolling_mode: false,
    boxdraw_mode: false,
    text_mode: false,
    mode_switcher: true,
    pixelcursor: false,
    pixeldraw: false
  };

  constructor() { }
  deactivateAll() {
    // Deactivate all modes
    for (const mode of Object.keys(this.modes)) {
      this.modes[mode] = false;
    }
  }

  activate(modes: string[]) {
    // Activate the modes given in the list
    // The names are the variable names in constructor in this file
    for (const mode of modes) {
      if (this.modes[mode] == undefined) {
        throw ReferenceError(`No such mode available: '${mode}'!`);
      }
      this.modes[mode] = true;
    }
  }

  isActive(mode: string) {
    if (this.modes[mode] == undefined) {
      throw ReferenceError(`No such mode available: '${mode}'!`);
    }
    return this.modes[mode];
  }

  normalMode() {
    this.deactivateAll();
    this.activate(['normal_mode', 'cursor_movement', 'color_changer', 'mode_switcher']);
  }
}
