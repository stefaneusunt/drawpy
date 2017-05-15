import {Component, HostListener, OnInit} from '@angular/core';
import {CursorService} from '../cursor/cursor.service';
import {NormalDrawService} from '../modes/normal-draw.service';
import {ColorChangeService} from "../color-changer/color-change.service";

@Component({
  selector: 'draw-modes-manager',
  template: '',
  styles: ['']
})
export class ModesManagerComponent implements OnInit {

  constructor(private cursServ: CursorService, private normalDrawMode: NormalDrawService,
              private colorChange: ColorChangeService) { }

  ngOnInit() {
  }

  @HostListener('window:keydown', ['$event'])
  handleKeys(event) {
    //event.preventDefault();
    //console.log(Object.keys(this));
    // for (let serv in this) {
    //   console.log(serv);
    //}
    for (const serv of Object.keys(this)) {
      // We go through all modes and call their handles if they're active
      if (this[serv].active) {
        this[serv].handle(event);
      }
    }
  }
}
