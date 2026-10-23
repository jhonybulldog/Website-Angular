import { Component, inject, OnInit } from "@angular/core";
import { TodosService } from "../../service/todos.service";
import { BehaviorSubject, combineLatest, map, Observable } from "rxjs";
import { AsyncPipe, formatDate } from "@angular/common";
import { CalendarTodo } from "../../models/todos.model";
import { RouterLink } from "@angular/router";

@Component({
  imports: [AsyncPipe, RouterLink],
  selector: "app-todo-calendar",
  styleUrl: "./todo-calendar.css",
  templateUrl: "./todo-calendar.html",
})
export class TodoCalendar implements OnInit {
  private todoser = inject(TodosService);
  private todos = new BehaviorSubject<CalendarTodo[]>([]);
  todos$: Observable<CalendarTodo[]> = this.todos.asObservable();

  private selectedDate = new BehaviorSubject<string>(
    formatDate(new Date(), "yyyy-MM-dd", "en-US"),
  );
  selectedDate$ = this.selectedDate.asObservable();


  unscheduled$: Observable<CalendarTodo[]> = this.todos$.pipe(
    map((todos) => todos.filter((todo) => todo.date === "" && !todo.completed)),
  );

dayTodos$: Observable<CalendarTodo[]> = combineLatest([this.todos$, this.selectedDate$]).pipe(
  map(([todos, date]) =>  todos.filter((todo)=> todo.date === date))
);
  selectDate(date: string) {
  this.selectedDate.next(date);
}


setDate(id: number, date: string) {
  this.updateTodo(id, { date });
}

toggleCompleted(todo: CalendarTodo) {
  this.todoser
    .aggiornaTodo(todo.id, !todo.completed)
    .subscribe((response) => this.updateTodo(todo.id, { completed: response.completed }));
}

private updateTodo(id: number, changes: Partial<CalendarTodo>) {
  const updatedTodos = this.todos.value.map((todo) =>
    todo.id === id ? { ...todo, ...changes } : todo,
  );
  this.todos.next(updatedTodos);
}

  ngOnInit(): void {
    this.todoser
      .caricaTodos(0, 0)
      .pipe(
        map((response) =>
          response.todos.map((todo) => ({ ...todo, date: "" })),
        ),
      )
      .subscribe((todos) => this.todos.next(todos));
  }
}
