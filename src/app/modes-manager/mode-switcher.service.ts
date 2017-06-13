import {Injectable} from '@angular/core';
import {DrawMode} from '../interfaces/draw-mode';
import {ModesStatusProviderService} from './modes-status-provider.service';

@Injectable()
export class ModeSwitcherService implements DrawMode {
  constructor(private modesStatus: ModesStatusProviderService) {
  }
  handle(event) {
    const key = event.key;
    if (key === 'm') {
      // Scrolling mode
      this.modesStatus.deactivateAll();
      this.modesStatus.activate(['scrolling_mode', 'mode_switcher']);
    }
    if (key === 'n' || key === 'Escape' || key === 'Enter') {
      // Normal mode
      this.modesStatus.normalMode();
    }
    if (key === 'b') {
      // Box drawing mode
      this.modesStatus.deactivateAll();
      this.modesStatus.activate(['boxdraw_mode', 'mode_switcher']);
    }
    if (key === 't') {
      this.modesStatus.deactivateAll();
      this.modesStatus.activate(['text_mode', 'cursor_movement']);
    }
  }

}
