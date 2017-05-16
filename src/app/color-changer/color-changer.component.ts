import {Component, HostListener, Input, OnInit} from '@angular/core';
import {ColorChangeService} from './color-change.service';

type ColorType = 'foreground' | 'background';

@Component({
  selector: 'draw-color-changer',
  templateUrl: './color-changer.component.html',
  styleUrls: ['./color-changer.component.scss']
})
export class ColorChangerComponent implements OnInit {

  // The controls for the color chooser dialog
  controls = [['1', '2', '3', '4', '5', '6', '7', '8'],
              ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i']];

  fontwidth = 11;
  padding = 10;
  CCServ;

  @Input() color_type: ColorType;

  constructor(private colorChangeServ: ColorChangeService) {
    this.CCServ = colorChangeServ;
  }

  ngOnInit() {
  }
  @HostListener('window:keydown', ['$event'])
  handleColorKeys(event) {
    // Check if we are active
    if ((this.color_type === 'foreground' && this.colorChangeServ.fg_dialog_visible === true) ||
        (this.color_type === 'background' && this.colorChangeServ.bg_dialog_visible === true)) {
      // We act upon the key if its one from controls
      const key = event.key;
      const color_index = [].concat(...this.controls).indexOf(key);
      if (color_index !== -1) {
        // The user has chosen a color, we apply it and close the dialog
        if (this.color_type === 'foreground') {
          this.colorChangeServ.fg = color_index;
          this.colorChangeServ.fg_dialog_visible = false;
        }
        if (this.color_type === 'background') {
          this.colorChangeServ.bg = color_index;
          this.colorChangeServ.bg_dialog_visible = false;
        }
      }
      if (key === 'Escape') {
        // Maybe the user changed his mind, close the dialog
        this.colorChangeServ.bg_dialog_visible = false;
        this.colorChangeServ.fg_dialog_visible = false;
      }
    }
  }
}
