import {Component, HostListener} from '@angular/core';
import {ModesManagerService} from './modes-manager.service';

@Component({
  selector: 'draw-modes-manager',
  template: '',
  styles: ['']
})

// The only reason this component exists is to capture keys from the webpage and
// pass them forward to the mode manager service

export class ModesManagerComponent {
  constructor(private modeManager: ModesManagerService) {
  }

  @HostListener('window:keydown', ['$event'])
  handleKeydown(event) {
    this.modeManager.handleKey(event);
  }
}
  /*
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
*/
