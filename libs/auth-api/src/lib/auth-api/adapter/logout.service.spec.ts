import { TestBed } from '@angular/core/testing';

import { LogoutAdapter } from './logout.service';

describe('LogoutService', () => {
  let service: LogoutAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogoutAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
