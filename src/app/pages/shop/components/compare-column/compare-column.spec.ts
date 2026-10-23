import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompareColumn } from './compare-column';

describe('CompareColumn', () => {
  let component: CompareColumn;
  let fixture: ComponentFixture<CompareColumn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompareColumn]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CompareColumn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
