/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GoecodingService } from './goecoding.service';

describe('GoecodingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoecodingService]
    });
  });

  it('should ...', inject([GoecodingService], (service: GoecodingService) => {
    expect(service).toBeTruthy();
  }));
});
