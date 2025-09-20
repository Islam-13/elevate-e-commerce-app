import { TestBed } from '@angular/core/testing';

import { VerifyCodeAdapter } from './verify-code.service';

describe('VerifyCodeService', () => {
  let service: VerifyCodeAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyCodeAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
