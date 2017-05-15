import { Component, HostListener, Input, OnInit } from '@angular/core';
import { CursorService } from './cursor.service';
import {ConsoleDataService} from "../console-display/console-data.service";

@Component({
  selector: 'draw-cursor',
  templateUrl: './cursor.component.html',
  styleUrls: ['./cursor.component.scss']
})
export class CursorComponent implements OnInit {

  @Input() fontwidth;
  CursServ;
  blink_rate = 312; // The time (miliseconds) between cursor blinks

  constructor(private cursServ: CursorService, private charsData: ConsoleDataService) {
    this.CursServ = cursServ;
  }

  ngOnInit() {
    setInterval(() => {
      this.cursServ.visible = (this.cursServ.visible + 1) % 2;
      }, this.blink_rate);
  }
}
