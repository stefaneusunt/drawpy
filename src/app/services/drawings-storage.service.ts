import { Injectable } from '@angular/core';
import {ConsoleDataService} from '../console-display/console-data.service';
import {HttpClient} from '@angular/common/http';
import {TokenProviderService} from '../auth/token-provider.service';
// The service that holds the saved drawings

@Injectable()
export class DrawingsStorageService {
  id2name = {};
  current_id; // The id that is currently selected by the user
  constructor(private consoleData: ConsoleDataService, private http: HttpClient, private tokenProvider: TokenProviderService) {
    this.http.get('/list_entries').subscribe(data => {
      this.id2name = data;
      for (const randid in this.id2name) {
        this.current_id = randid;
        this.load_current_draw();
        break;
      }
    });
  }

  new_drawing() {
    // Creates a new entry for a new drawing and selects it
    this.http.get('/new_draw').subscribe(data => {
      this.current_id = data['id'];
      this.id2name[data['id']] = data['name'];
      this.consoleData.offset = [0, 0];
      this.consoleData.chars = {};
    });
  }

  save_current_draw() {
    if (this.tokenProvider.ready && this.consoleData.modified) {
      this.http.post(`/update_draw/${this.current_id}`, {json: JSON.stringify([this.consoleData.offset,
        this.consoleData.chars])}).subscribe(data => {
        this.consoleData.modified = false;
      });
    }
  }

  load_current_draw() {
    this.http.get(`/get_draw/${this.current_id}`).subscribe(data => {
      this.consoleData.offset = [0, 0];
      this.consoleData.chars = {};
      this.consoleData.modified = false;
      if (data['json'] !== '') {
        console.log(data);
        let content;
        try {
          content = JSON.parse(data['json']);
        } catch (err) {
          // The content in the database is not a save, we treat it as empty
          return;
        }
        this.consoleData.offset = content[0];
        this.consoleData.chars = content[1];
      } else {

      }
    });
  }
  rename(newName) {
    const id = this.current_id;
    this.http.get(`/rename/${id}/${newName}`).subscribe(r => {
      this.id2name[id] = newName;
    });
  }
  delete() {
    this.http.delete(`/delete_draw/${this.current_id}`).subscribe(r => {
      delete this.id2name[this.current_id];
      for (const rand_id in this.id2name) {
        this.current_id = rand_id;
        this.load_current_draw();
        break;
      }
    });
  }
}
