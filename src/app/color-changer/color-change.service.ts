import { Injectable } from '@angular/core';
import { DrawMode } from '../interfaces/draw-mode';
import {ControlsService} from "../services/controls.service";

@Injectable()
export class ColorChangeService implements DrawMode {
  active = true;
  fg = 7;
  bg = 0;
  fg_dialog_visible = false;
  bg_dialog_visible= false;
  constructor(private  controls: ControlsService) { }

  handle(event) {
    const key = event.key;
    if (key === this.controls.fg_change) {
      this.fg_dialog_visible = true;
    }
    if (key === this.controls.bg_change) {
      this.bg_dialog_visible = true;
    }
  }

}
