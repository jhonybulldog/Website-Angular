import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LastP } from './last-p';

describe('LastP', () => {
  let component: LastP;
  let fixture: ComponentFixture<LastP>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastP]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LastP);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
