import { TestBed } from '@angular/core/testing';

import { ForgetPasswordAdapter } from './forget-password.service';

describe('ForgetPasswordService', () => {
  let service: ForgetPasswordAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgetPasswordAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
