import { Injectable } from '@angular/core';
import {FontGeneratorService} from '../services/font-generator.service';
import {FontProviderService} from '../services/font-provider.service';

// This service injects the needed css for the consle char component

@Injectable()
export class CssInjectorService {

  constructor(private fontGen: FontGeneratorService, private fontProv: FontProviderService) {
    this.fontGen.generate_fontsheets(() => {this.generate_consolefont_css(); });
    console.log('YEY');
  }
  generate_consolefont_css() {
    // Generate all the css classes from the fontsheets so that the html won't be filled up with copies with each char
    const css = [];
    for (const fontwidth of this.fontProv.fontwidths) {
      for (let color = 0; color < 16; color++) {
        css.push(`.consolefont${fontwidth}_${color} { 
        position: relative;
        height: ${2 * fontwidth}px;
        width: ${fontwidth * this.fontGen.chars.length}px;
        background: url(${this.fontProv.fontsheet(fontwidth, color)});
        }`);
      }
    }
    const s = document.createElement('style');
    s.type = 'text/css';
    s.innerHTML = css.join('\n');
    document.body.appendChild(s);
  }
}
