import { TestBed } from '@angular/core/testing';
import { ProductFavorite } from './product-favorite';

describe('ProductFavorite', () => {
  let service: ProductFavorite;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductFavorite);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
