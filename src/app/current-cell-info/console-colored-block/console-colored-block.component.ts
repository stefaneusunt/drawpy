import {Component, Input, OnInit} from '@angular/core';
import {FontGeneratorService} from '../../services/font-generator.service';

@Component({
  selector: 'draw-console-colored-block',
  templateUrl: './console-colored-block.component.html',
  styleUrls: ['./console-colored-block.component.scss']
})
export class ConsoleColoredBlockComponent implements OnInit {
  FontServ;
  @Input() termcolor;
  constructor(private fontServ: FontGeneratorService) {
    this.FontServ = fontServ;
  }
  ngOnInit() {
  }

}
