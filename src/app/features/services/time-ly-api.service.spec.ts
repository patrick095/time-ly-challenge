import { TestBed } from '@angular/core/testing';

import { TimeLyApiService } from './time-ly-api.service';

describe('TimeLyApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimeLyApiService = TestBed.get(TimeLyApiService);
    expect(service).toBeTruthy();
  });
});
