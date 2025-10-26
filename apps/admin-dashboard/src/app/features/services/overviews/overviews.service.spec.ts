import { TestBed } from '@angular/core/testing';

import { OverviewsService } from './overviews.service';

describe('OverviewsService', () => {
  let service: OverviewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverviewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
