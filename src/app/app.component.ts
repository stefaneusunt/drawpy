import { Component } from '@angular/core';
import {NormalDrawService} from './modes/normal-draw.service';
import {ColorChangeService} from "./modes/color-change.service";

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
  constructor(private normalMode: NormalDrawService, private colorchange: ColorChangeService) {
    this.NormalMode = normalMode;
    this.ColorChange = colorchange;
  }
}
