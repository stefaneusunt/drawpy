import { Injectable } from '@angular/core';

// This service provides colored font sheets for console chars form the generator

@Injectable()
export class FontProviderService {

  fontsheets = {}; // 'fontwidth_color' -> dataURL Ex.: 8_0 -> data... (for 8px width black fontsheet)
  // Available font widths
  fontwidths = [8, 10, 11, 12, 14, 16];
  constructor() { }
  fontsheet(fontwidth: number, color: number) {
    // Return the fontsheet for the requested fontwidth and color configuration
    if (typeof(fontwidth) === 'string') {
      fontwidth = parseInt(fontwidth);
    }
    if (this.fontwidths.indexOf(fontwidth) === -1) {
      throw new RangeError(`No such fontwidth available: ${fontwidth}!`);
    }
    if (color < 0 || color > 15) {
      throw new RangeError(`No such font color ${color}!`);
    }
    return this.fontsheets[`${fontwidth}_${color}`];
  }

}
