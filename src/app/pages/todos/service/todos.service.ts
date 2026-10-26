import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CalendarTodo, Todo, TodosResponse } from "../models/todos.model";


@Injectable({ providedIn: "root" })
export class TodosService {
  private http = inject(HttpClient);
  private url = "https://dummyjson.com/todos";

  caricaTodos(limit: number, skip: number) {
    return this.http.get<TodosResponse>(this.url, {
      params: {
        limit: limit,
        skip: skip,
      },
    });
  }

  aggiornaTodo(id: number, completed: boolean) {
    return this.http.put<Todo>(`${this.url}/${id}`, { completed: completed });
  }

  addCalendar(todo: Partial<CalendarTodo>){
    return this.http.put<CalendarTodo>(`${this.url}/${todo.id}`, {todo})
  } 
}
