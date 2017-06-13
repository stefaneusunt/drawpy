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
