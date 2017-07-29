import {Component, Input, OnInit} from '@angular/core';
import {PixelDrawCursorService} from "../pixel-draw-cursor.service";

@Component({
  selector: 'draw-pixel-draw-cursor',
  templateUrl: './pixel-draw-cursor.component.html',
  styleUrls: ['./pixel-draw-cursor.component.scss']
})
export class PixelDrawCursorComponent implements OnInit {

  @Input() fontwidth;
  PixelCurs;
  blink_rate = 312;
  constructor(private pixelcurs: PixelDrawCursorService) {
    this.PixelCurs = pixelcurs;
  }

  ngOnInit() {
    setInterval(() => {
      this.pixelcurs.visible = (this.pixelcurs.visible + 1) % 2;
    }, this.blink_rate);
  }

}
