import { TestBed } from '@angular/core/testing';

import { AuthLoginApiAdapter } from './auth-login-api-adapter.service';

describe('AuthApiAdapterService', () => {
  let service: AuthLoginApiAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthLoginApiAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
