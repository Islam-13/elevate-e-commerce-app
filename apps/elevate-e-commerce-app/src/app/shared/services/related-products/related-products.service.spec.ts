import { TestBed } from '@angular/core/testing';

import { RelatedProductsService } from './related-products.service';

describe('RelatedProductsService', () => {
  let service: RelatedProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelatedProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
