import { Component, Input, OnInit} from '@angular/core';
import { ConsoleDataService } from './console-data.service';

@Component({
  selector: 'draw-console-display',
  templateUrl: './console-display.component.html',
  styleUrls: ['./console-display.component.scss']
})
export class ConsoleDisplayComponent implements OnInit {

  @Input() fontwidth;
  Object;
  CharsServ;
  parseInt;
  c;

  constructor(private charsServ: ConsoleDataService) {
    this.Object = Object;
    this.CharsServ = charsServ;
    this.parseInt = parseInt;
    this.c = console;
  }

  ngOnInit() {
  }

}
