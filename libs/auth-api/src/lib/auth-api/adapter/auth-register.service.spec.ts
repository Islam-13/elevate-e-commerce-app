import { TestBed } from '@angular/core/testing';

import { AuthRegisterAdapterer } from './auth-register.service';

describe('AuthRegisterService', () => {
  let service: AuthRegisterAdapterer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthRegisterAdapterer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
