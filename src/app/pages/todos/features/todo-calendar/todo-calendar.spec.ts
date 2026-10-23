import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoCalendar } from './todo-calendar';

describe('TodoCalendar', () => {
  let component: TodoCalendar;
  let fixture: ComponentFixture<TodoCalendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoCalendar]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TodoCalendar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
