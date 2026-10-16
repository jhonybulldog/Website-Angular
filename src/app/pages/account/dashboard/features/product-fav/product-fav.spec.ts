import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFav } from './product-fav';

describe('ProductFav', () => {
  let component: ProductFav;
  let fixture: ComponentFixture<ProductFav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFav]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductFav);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
