import {Injectable, Injector} from '@angular/core';
import { CursorService } from '../cursor/cursor.service';
import { NormalDrawService } from '../modes/normal-draw.service';
import { ColorChangeService } from '../color-changer/color-change.service';
import { ScrollService } from '../modes/scroll.service';
import { BoxDrawService } from '../modes/box-draw.service';
import { TextService } from '../modes/text.service';
import { ModeSwitcherService } from './mode-switcher.service';
import {ModesStatusProviderService} from "./modes-status-provider.service";

@Injectable()
export class ModesManagerService {

  // These "private" vars should have intuitive names, as they are used to
  // activate/deactivate individual modes
  constructor(private cursor_movement: CursorService, private normal_mode: NormalDrawService,
              private color_changer: ColorChangeService, private modesStatus: ModesStatusProviderService,
              private scrolling_mode: ScrollService, private boxdraw_mode: BoxDrawService,
              private text_mode: TextService, private mode_switcher: ModeSwitcherService) {
    for (const s of Object.keys(this)) {
      console.log(s);
    }
  }

  handleKey(event) {
    // mode_switcher is a special case, as the services are injecting each other
    // I have to get it with the injector every time I need to use it
    for (const serv of Object.keys(this)) {
      if (this.modesStatus.modes[serv]) {
        event.preventDefault();
        this[serv].handle(event);
      }
    }
  }
}
