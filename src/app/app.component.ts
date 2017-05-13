import { Component } from '@angular/core';

@Component({
  selector: 'draw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'draw works!';
  str = [];
  Array;
  constructor() {
    this.Array = Array;
  }
}
