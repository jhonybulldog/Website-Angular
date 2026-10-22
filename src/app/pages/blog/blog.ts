import { Component, inject, signal } from "@angular/core";
import { Blogcard } from "./components/blogcard/blogcard";
import { PaginatedGrid } from "../../shared/paginated-grid/paginated-grid";
import { SortSelect } from "../../shared/sort-select/sort-select";
import { BlogService } from "./service/blog.service";
import { Post } from "./models/blog.model";
import { AsyncPipe } from "@angular/common";
@Component({
  imports: [PaginatedGrid, Blogcard, SortSelect, AsyncPipe],
  selector: "app-blog",
  styleUrl: "./blog.css",
  templateUrl: "./blog.html",
  providers: [BlogService],
})
export class Blog {
  private bservice = inject(BlogService);
  posts = signal<Post[]>([]);
  totale = signal(0);
  order = signal({ label: "", sortBy: "", order: "" });
  loading$ = this.bservice.loading$;
  orderoption = [
    { label: "Ordina per views", sortBy: "", order: "" },
    { label: "Views più basse", sortBy: "views", order: "asc" },
    { label: "Views più alte", sortBy: "views", order: "desc" },
    { label: "like più bassi", sortBy: "reactions.likes", order: "asc" },
    { label: "like più alti", sortBy: "reactions.likes", order: "desc" },
  ];
  carica(e: { limit: number; skip: number; search: string }) {
    this.bservice
      .caricablog(
        e.limit,
        e.skip,
        this.order().order,
        this.order().sortBy,
        e.search,
      )
      .subscribe((risposta) => {
        this.posts.set(risposta.posts);
        this.totale.set(risposta.total);
      });
  }
}
