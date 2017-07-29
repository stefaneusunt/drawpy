import {Injectable} from '@angular/core';
import {DrawMode} from '../interfaces/draw-mode';
import {ModesStatusProviderService} from './modes-status-provider.service';
import {ControlsService} from "../services/controls.service";
import {CursorService} from "../cursor/cursor.service";
import {PixelDrawCursorService} from "../modes/pixeldraw/pixel-draw-cursor.service";

@Injectable()
export class ModeSwitcherService implements DrawMode {
  constructor(private modesStatus: ModesStatusProviderService, private controls: ControlsService,
              private cursor: CursorService, private pixelcurs: PixelDrawCursorService) {
  }
  handle(event) {
    const key = event.key;
    if (key === this.controls.scroll_mode) {
      // Scrolling mode
      this.modesStatus.deactivateAll();
      this.modesStatus.activate(['scrolling_mode', 'mode_switcher']);
    }
    if (key === this.controls.normal_mode) {
      // Normal mode
      if (this.modesStatus.modes['pixeldraw']) {
        [this.cursor.x, this.cursor.y] = [this.pixelcurs.x, this.pixelcurs.y];
      }
      this.modesStatus.normalMode();
      this.pixelcurs.disable();
      this.cursor.enable();

    }
    if (key === this.controls.boxdraw_mode) {
      // Box drawing mode
      this.modesStatus.deactivateAll();
      this.modesStatus.activate(['boxdraw_mode', 'mode_switcher', 'color_changer']);
    }
    if (key === this.controls.text_mode) {
      this.modesStatus.deactivateAll();
      this.modesStatus.activate(['text_mode', 'cursor_movement']);
    }
    if (key === this.controls.pixeldraw) {
      this.modesStatus.deactivateAll();
      this.cursor.disable();
      this.pixelcurs.enable();
      [this.pixelcurs.x, this.pixelcurs.y] = [this.cursor.x, this.cursor.y];
      this.modesStatus.activate(['pixeldraw', 'mode_switcher', 'color_changer', 'pixelcursor']);
    }
  }

}
