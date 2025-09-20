import { TestBed } from '@angular/core/testing';

import { ResetPasswordAdapter } from './reset-password.service';

describe('ResetPasswordService', () => {
  let service: ResetPasswordAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResetPasswordAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
