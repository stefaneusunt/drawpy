import { TestBed, inject } from '@angular/core/testing';

import { ConsoleDataService } from './console-data.service';

describe('ConsoleDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsoleDataService]
    });
  });

  it('should ...', inject([ConsoleDataService], (service: ConsoleDataService) => {
    expect(service).toBeTruthy();
  }));
});
