import { Injectable } from '@angular/core';

@Injectable()
export class TokenProviderService {
  token = '';
  ready = false;
  constructor() { }
}
