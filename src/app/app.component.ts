import { Component } from '@angular/core';
import {NormalDrawService} from './modes/normal-draw.service';
import {ColorChangeService} from './color-changer/color-change.service';
import {ModesManagerService} from './modes-manager/modes-manager.service';

@Component({
  selector: 'draw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'draw works!';
  fontwidth = 16;
  NormalMode;
  ColorChange;
  ModesManager;
  constructor(private normalMode: NormalDrawService, private colorchange: ColorChangeService, private modMgr: ModesManagerService) {
    this.NormalMode = normalMode;
    this.ColorChange = colorchange;
    this.ModesManager = modMgr;
  }
}
