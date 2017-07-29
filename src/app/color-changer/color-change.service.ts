import { Injectable } from '@angular/core';
import { DrawMode } from '../interfaces/draw-mode';
import {ControlsService} from "../services/controls.service";
import {ModesStatusProviderService} from "../modes-manager/modes-status-provider.service";

@Injectable()
export class ColorChangeService implements DrawMode {
  active = true;
  fg = 7;
  bg = 0;
  fg_dialog_visible = false;
  bg_dialog_visible= false;
  constructor(private  controls: ControlsService, private modesStatus: ModesStatusProviderService) { }
  disable_all() {
    this.modesStatus.saveModesStatus();
    this.modesStatus.deactivateAll();
  }
  handle(event) {
    const key = event.key;
    if (key === this.controls.fg_change) {
      this.fg_dialog_visible = true;
      this.disable_all();
    }
    if (key === this.controls.bg_change) {
      this.bg_dialog_visible = true;
      this.disable_all();
    }
  }

}
