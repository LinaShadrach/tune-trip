/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SongKickService } from './song-kick.service';

describe('SongKickService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SongKickService]
    });
  });

  it('should ...', inject([SongKickService], (service: SongKickService) => {
    expect(service).toBeTruthy();
  }));
});
