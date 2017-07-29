import { Component, OnInit } from '@angular/core';
import {CursorService} from '../cursor/cursor.service';
import {ColorChangeService} from '../color-changer/color-change.service';
import {ConsoleDataService} from '../console-display/console-data.service';

@Component({
  selector: 'draw-current-cell-info',
  templateUrl: './current-cell-info.component.html',
  styleUrls: ['./current-cell-info.component.scss']
})
export class CurrentCellInfoComponent implements OnInit {
  Cursor;
  Colors;
  CharServ;
  constructor(private curs: CursorService, private colors: ColorChangeService, private cs: ConsoleDataService) {
    this.Cursor = curs;
    this.Colors = colors;
    this.CharServ = cs;
  }
  ngOnInit() {
  }

}
