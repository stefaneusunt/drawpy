import { Component, ElementRef, Input, OnChanges, OnInit} from '@angular/core';
import { ConsoleDataService } from './console-data.service';
import { CursorService } from '../cursor/cursor.service';

@Component({
  selector: 'draw-console-display',
  templateUrl: './console-display.component.html',
  styleUrls: ['./console-display.component.scss']
})
export class ConsoleDisplayComponent implements OnInit, OnChanges {

  @Input() fontwidth: number;
  Object;
  CharsServ;
  parseInt;
  c;

  constructor(private charsServ: ConsoleDataService, private el: ElementRef,
              private cursorServ: CursorService) {
    this.Object = Object;
    this.CharsServ = charsServ;
    this.parseInt = parseInt;
    this.c = console;

  }
  updateSize() {
    // Updates the width and height of the console (in characters, not pixels)
    const rect = this.el.nativeElement.firstChild.getBoundingClientRect();
    [this.charsServ.width,
      this.charsServ.height] = [Math.floor(rect.width / this.fontwidth),
                                Math.floor(rect.height / (2 * this.fontwidth))];
    this.cursorServ.checkCursorOutOfBounds();
  }

  ngOnInit() {
    this.updateSize();
  }
  ngOnChanges() {
    // When the fontsize changes, the console size will be different
    this.updateSize();
  }
  updateCursorOnMouseMove(event) {
    //
    const rect = this.el.nativeElement.getBoundingClientRect();
    // console.log(this.cursorServ);
    // console.log(event);
    // console.log(rect);
    // console.log(`${event.clientX - rect.left}x${event.clientY - rect.top}`);
    [this.cursorServ.x,
      this.cursorServ.y] = [Math.floor((event.clientX - rect.left)/ this.fontwidth),
                            Math.floor((event.clientY - rect.top) / (2 * this.fontwidth))];
    this.cursorServ.visible = 1;
  }
}
