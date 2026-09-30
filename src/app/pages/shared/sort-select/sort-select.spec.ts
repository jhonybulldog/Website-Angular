import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SortSelect } from './sort-select';

describe('SortSelect', () => {
  let component: SortSelect;
  let fixture: ComponentFixture<SortSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortSelect]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SortSelect);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
