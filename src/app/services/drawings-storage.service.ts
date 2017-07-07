import { Injectable } from '@angular/core';
import {ConsoleDataService} from '../console-display/console-data.service';

// The service that holds the saved drawings

@Injectable()
export class DrawingsStorageService {
  id2name = {};
  current_id; // The id that is currently selected by the user
  next_id = 1;
  constructor(private consoleData: ConsoleDataService) {
    // Check if we have any data in local storage
    if (localStorage['next_id'] != undefined) {
      // Load the data
      this.next_id = parseInt(localStorage['next_id']);
      this.id2name = JSON.parse(localStorage['id2name']);
      const ids = Object.keys(this.id2name);
      this.current_id = ids[ids.length - 1];
      this.load_current_draw();
    } else {
      // No data
      this.id2name[0] = 'Untitled 1';
      this.current_id = 0;
    }
  }

  new_drawing() {
    // Creates a new entry for a new drawing and selects it
    let nr = 1;
    while (true) {
      let found = false;
      for (const id in this.id2name) {
        if (this.id2name[id] === `Untitled ${nr}`) {
          found = true;
          break;
        }
      }
      if (found) {
        // The Unitlted n name is already used
        nr++;
      } else {
        // The name can be used
        this.save_current_draw();
        this.id2name[this.next_id] = `Untitled ${nr}`;
        this.current_id = this.next_id;
        this.next_id++;
        this.consoleData.offset = [0, 0];
        this.consoleData.chars = {};
        break;
      }
    }
  }

  save_current_draw() {
    // Saves the current draw into the local storage
    localStorage['next_id'] = this.next_id.toString();
    localStorage['id2name'] = JSON.stringify(this.id2name);
    localStorage[`draw_${this.current_id}`] = JSON.stringify([this.consoleData.offset, this.consoleData.chars]);
  }

  load_current_draw() {
    // Loads the draw with the current id into th console data service
    const drawi = `draw_${this.current_id}`;
    if (localStorage[drawi] != undefined) {
      const data = JSON.parse(localStorage[drawi]);
      this.consoleData.offset = data[0];
      this.consoleData.chars = data[1];
    }
  }

}
