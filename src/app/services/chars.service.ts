import { Injectable } from '@angular/core';

// This service holds the characters and the char2index mapping
// so this pieces of data doesn't have to be stored for each console char

@Injectable()
export class CharsService {

  chars = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~▓┼┴▄█▒─▌└┘├░▐┤┬▀┌┐│';
  char2index = {};

  constructor() {
    for (let i = 0; i < this.chars.length; i++) {
      this.char2index[this.chars[i]] = i;
    }
  }

  indexOfChar(ch) {
    return this.char2index[ch];
  }

}
