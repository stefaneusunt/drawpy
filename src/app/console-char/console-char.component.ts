import {Component, Input, OnInit} from '@angular/core';
import {CharsService} from '../services/chars.service';
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
  CharsServ;
  FontServ;

  constructor(private charsServ: CharsService, private fontServ: FontService) {
    this.CharsServ = charsServ;
    this.FontServ = fontServ;
  }

  ngOnInit() {}

}
