import {Component, Input, OnInit} from '@angular/core';
import {FontService} from '../services/font.service';

@Component({
  selector: 'draw-console-char',
  templateUrl: './console-char.component.html',
  styleUrls: ['./console-char.component.scss']
})
export class ConsoleCharComponent implements OnInit {

  @Input() char: string;
  @Input() fontwidth: number;
  @Input() fg: number;
  @Input() bg: number;
  FontServ;

  constructor(private fontServ: FontService) {
    this.FontServ = fontServ;
  }

  ngOnInit() {}

}
