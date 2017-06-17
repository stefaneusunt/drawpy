import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {FontGeneratorService} from '../services/font-generator.service';
import {CssInjectorService} from "./css-injector.service";

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

  constructor(private fontServ: FontGeneratorService, private el: ElementRef, private cssinj: CssInjectorService) {
    this.FontServ = fontServ;
  }

  ngOnInit() {
  }

}
