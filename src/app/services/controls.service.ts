import { Injectable } from '@angular/core';

// The service that provides controls(keys) for the entire application

@Injectable()
export class ControlsService {
  draw = ' ';
  normal_mode = 'Enter';
  boxdraw_mode = 'b';
  text_mode = 't';
  scroll_mode = 'm';
  fg_change = 'c';
  bg_change = 'x';
  pixeldraw = 'p';
  constructor() { }

}
