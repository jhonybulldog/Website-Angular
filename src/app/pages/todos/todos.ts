import { Component, OnInit, inject, signal } from "@angular/core";
import { PaginatedGrid } from "../shared/paginated-grid/paginated-grid";
import { Todo, TodosService } from "./todos.service";

@Component({
  imports: [PaginatedGrid],
  selector: "app-todos",
  styleUrl: "./todos.css",
  templateUrl: "./todos.html",
})
export class Todos implements OnInit {
  private todosService = inject(TodosService);
  todos = signal<Todo[]>([]);

  toggle(todo: Todo) {
  this.todosService.update(todo.id, !todo.completed).subscribe((updated) => {
    this.todos.update((list) =>
      list.map((t) =>
        t.id === todo.id ? { ...t, completed: updated.completed } : t,
      ),
    );
  });
}
  ngOnInit(): void {
    this.todosService.loadAll().subscribe((response) => {
      this.todos.set(response.todos);
    });
  }
}