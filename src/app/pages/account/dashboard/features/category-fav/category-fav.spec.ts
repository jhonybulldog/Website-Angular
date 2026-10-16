import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryFav } from './category-fav';

describe('CategoryFav', () => {
  let component: CategoryFav;
  let fixture: ComponentFixture<CategoryFav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryFav]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CategoryFav);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
