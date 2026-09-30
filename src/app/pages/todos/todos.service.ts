import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";

export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface TodosResponse {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}

@Injectable({ providedIn: "root" })
export class TodosService {
  private http = inject(HttpClient);
  private url = "https://dummyjson.com/todos";

  loadAll() {
    return this.http.get<TodosResponse>(this.url, { params: { limit: 0 } });
  }
  update(id: number, completed: boolean) {
  return this.http.put<Todo>(`${this.url}/${id}`, { completed });
}
}