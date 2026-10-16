import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompareB } from './compare-b';

describe('CompareB', () => {
  let component: CompareB;
  let fixture: ComponentFixture<CompareB>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompareB]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CompareB);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
