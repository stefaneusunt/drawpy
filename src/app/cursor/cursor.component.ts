import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'draw-cursor',
  templateUrl: './cursor.component.html',
  styleUrls: ['./cursor.component.scss']
})
export class CursorComponent implements OnInit {

  @Input() fontwidth;
  x: 0;
  y: 0;

  constructor() { }

  ngOnInit() {
  }

}
