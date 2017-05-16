import {Component, HostListener, OnInit} from '@angular/core';
import {CursorService} from '../cursor/cursor.service';
import {NormalDrawService} from '../modes/normal-draw.service';
import {ColorChangeService} from '../color-changer/color-change.service';

@Component({
  selector: 'draw-modes-manager',
  template: '',
  styles: ['']
})
export class ModesManagerComponent implements OnInit {

  savedStatus = {}; // modeServiceName -> active

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
  saveStatus() {
    // Save the active status for all the modes, which can be restored using restoreStatus
    this.savedStatus = {};
    for (const serv of Object.keys(this)) {
      this.savedStatus[serv] = this[serv].active;
    }
  }
  restoreStatus() {
    // Restore the active status saved from the saveStaus call
    for (const serv of Object.keys(this)) {
      this[serv].active = this.savedStatus[serv];
    }
  }
  disableAll() {
    // Deactivate all modes
    for (const serv of Object.keys(this)) {
      this[serv].active = false;
    }
  }
}
