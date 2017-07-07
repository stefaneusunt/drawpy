import { Component } from '@angular/core';
import {NormalDrawService} from './modes/normal-draw.service';
import {ColorChangeService} from './color-changer/color-change.service';
import {ModesStatusProviderService} from './modes-manager/modes-status-provider.service';
import {DrawingsStorageService} from "./services/drawings-storage.service";

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
  DrawStorage;
  Object;
  a = false;
  console;
  constructor(private normalMode: NormalDrawService, private colorchange: ColorChangeService,
              private modMgr: ModesStatusProviderService, private drawstor: DrawingsStorageService) {
    this.NormalMode = normalMode;
    this.ColorChange = colorchange;
    this.ModesStatus = modMgr;
    this.DrawStorage = drawstor;
    this.Object = Object;
    this.console = console;
  }
  freeze_draw() {
    //Makes the main draw app not respond to any input, used while the user is typying something in the savefile box
    this.modMgr.saveModesStatus();
    this.modMgr.deactivateAll();
  }
  unfreeze_draw() {
    //Restores normal functionality
    this.modMgr.restoreModesStatus();
  }
}
