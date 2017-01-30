/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ShowService } from './show.service';

describe('ShowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShowService]
    });
  });

  it('should ...', inject([ShowService], (service: ShowService) => {
    expect(service).toBeTruthy();
  }));
});
