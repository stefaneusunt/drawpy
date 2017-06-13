import { Component } from '@angular/core';
import {NormalDrawService} from './modes/normal-draw.service';
import {ColorChangeService} from './color-changer/color-change.service';
import {ModesStatusProviderService} from './modes-manager/modes-status-provider.service';

@Component({
  selector: 'draw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  fontwidth = 16;
  NormalMode;
  ColorChange;
  ModesStatus;
  constructor(private normalMode: NormalDrawService, private colorchange: ColorChangeService,
              private modMgr: ModesStatusProviderService) {
    this.NormalMode = normalMode;
    this.ColorChange = colorchange;
    this.ModesStatus = modMgr;
  }
}
