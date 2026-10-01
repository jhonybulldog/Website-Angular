import { Component, inject, signal } from "@angular/core";
import { PaginatedGrid } from "../shared/paginated-grid/paginated-grid";
import { Todo, TodosService } from "./todos.service";

@Component({
  imports: [PaginatedGrid],
  selector: "app-todos",
  styleUrl: "./todos.css",
  templateUrl: "./todos.html",
})
export class Todos {
  private todoser = inject(TodosService);

  todos = signal<Todo[]>([]);
  totale = signal(0);
  carica(e: { limit: number; skip: number; search: string }) {
    this.todoser.caricaTodos(e.limit, e.skip).subscribe((risposta) => {
      this.todos.set(risposta.todos);
      this.totale.set(risposta.total);
    });
  }

  toggle(todo: Todo) {
    this.todoser.aggiornaTodo(todo.id, !todo.completed).subscribe((risposta) => {
      this.todos.update((lista) =>
        lista.map((t) =>
          t.id === todo.id ? { ...t, completed: risposta.completed } : t,
        ),
      );
    });
  }
}