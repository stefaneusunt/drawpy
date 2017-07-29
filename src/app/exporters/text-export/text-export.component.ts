import { Component, OnInit } from '@angular/core';
import {ConsoleDataService} from "../../console-display/console-data.service";
import {acs} from "../../misc/acs";

// The component for exporting the drawing as plain text

@Component({
  selector: 'draw-text-export',
  templateUrl: './text-export.component.html',
  styleUrls: ['./text-export.component.scss']
})
export class TextExportComponent implements OnInit {

  visible = false; // The visibility of the export dialog
  content = '';
  constructor(private consoleData: ConsoleDataService) { }

  ngOnInit() {
  }
  perform_export() {
    const mind = this.consoleData.min_xy();
    const maxd = this.consoleData.max_xy();
    const [w, h] = [maxd[0] - mind[0] + 1, maxd[1] - mind[1] + 1];
    let res = [];
    for (let i = 0; i < h; i++) {
      res.push([]);
      for (let j = 0; j < w; j++) {
        res[i].push('\u2000');
      }
    }
    console.log(res);
    for (const xy of Object.keys(this.consoleData.chars)) {
      const [x, y] = this.consoleData.str2xy(xy);
      const char = this.consoleData.get_char(x, y);
      let ch = char.ch;
      if (char.ch === acs.uhalfblock) {
        if (char.fg === 0 && char.bg !== 0) {
          ch = acs.dhalfblock;
        }
        if (char.fg !== 0 && char.bg !== 0) {
          ch = acs.fullblock;
        }
      }
      // if (res[y - h + 1] == undefined) { continue; }
      res[y - mind[1]][x - mind[0]] = ch;
    }
    this.content = res.map((x) => x.join('')).join('\n');
  }
}
