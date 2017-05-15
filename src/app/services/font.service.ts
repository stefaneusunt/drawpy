import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

// This service provides colored font sheets for console chars

@Injectable()
export class FontService {

  // The characters present in each fontsheet
  chars = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~▓┼┴▄█▒─▌└┘├░▐┤┬▀┌┐│';
  // We need char -> index associations
  char2index = {};
  // Available font widths
  fontwidths = [8, 10, 11, 12, 14, 16];
  // RGB pairs for terminal colors, the bright ones will be generated in constructor
  consolecolor2rgb = {
    0: [0, 0, 0],
    1: [173, 0, 0],
    2: [0, 170, 0],
    3: [173, 85, 0],
    4: [0, 0, 173],
    5: [173, 0, 173],
    6: [0, 170, 173],
    7: [173, 170, 173]
  };
  // Store for all fontsheets possible configurations
  fontsheets = {}; // 'fontwidth_color' -> dataURL Ex.: 8_0 -> data... (for 8px width black fontsheet)

  constructor() {
    // Finish by generating bold console colors
    for (let i = 0; i < 8; i++) {
      const [r, g, b] = this.consolecolor2rgb[i];
      this.consolecolor2rgb[i + 8] = [r + 82, g + 85, b + 82];
    }
    // Yellow console color is an exception to the bright rule
    this.consolecolor2rgb[11] = [255, 255, 82];

    // We fill up the char2index dictionary
    for (let i = 0; i < this.chars.length; i++) {
      this.char2index[this.chars[i]] = i;
    }

    // Now we genereate a fontsheet for each color and fontwidth
    for (const fontwidth of this.fontwidths) {
      const canvas = document.createElement('canvas');
      canvas.width = fontwidth * this.chars.length;
      canvas.height = fontwidth * 2;
      const ctx = canvas.getContext('2d');
      const fontsheet = new Image();
      fontsheet.src = `../../assets/console_fonts/console_font_${fontwidth}x${fontwidth * 2}.png`;
      Observable.fromEvent(fontsheet, 'load').subscribe(
        () => {
          // When the fontsheet loads we generate each needed color
          for (let color = 0; color < 16; color++) {
            ctx.drawImage(fontsheet, 0, 0);
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pxls = imgData.data;
            for (let i = 0; i < pxls.length; i += 4) {
              // Now we modify the pixels by replacing black with the console color `color`
              if (pxls[i] === 0 && pxls[i + 1] === 0 && pxls[i + 2] === 0) { // If the pixel is black...
                const rgb = this.consolecolor2rgb[color];
                pxls[i    ] = rgb[0];
                pxls[i + 1] = rgb[1];
                pxls[i + 2] = rgb[2];
              }
            }
            ctx.putImageData(imgData, 0, 0);
            this.fontsheets[`${fontwidth}_${color}`] = canvas.toDataURL();
          }
        });
      console.log(typeof 'sdsds');
    }
  }

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
