import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http';
import {TokenProviderService} from './token-provider.service';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private tokenProvider: TokenProviderService) { }
  auth(access_key) {
    this.http.post('/auth', {'access_key': access_key})
      .subscribe(data => {
        if (data['success']) {
          this.tokenProvider.token = data['token'];
          this.tokenProvider.ready = true;
        }
      });
  }
}
