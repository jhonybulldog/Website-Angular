import { Component, OnInit, computed, inject, signal } from "@angular/core";
import { BlogService } from "./blog.service";
import { Searchbox } from "../shared/searchbox/searchbox";
import { PaginatedGrid } from "../shared/paginated-grid/paginated-grid";
import { Blogcard } from "./blogcard/blogcard";
import { SortSelect } from "../shared/sort-select/sort-select";
@Component({
  imports: [Searchbox, PaginatedGrid, Blogcard, SortSelect],
  selector: "app-blog",
  styleUrl: "./blog.css",
  templateUrl: "./blog.html",
  providers: [BlogService],
})
export class Blog implements OnInit {
  private bservice = inject(BlogService);
  order = signal("");
  ricerca = signal("");
  orderoption = [
    { value: "", label: "Ordina per wiews" },
    { value: "asc", label: "wiews più basso" },
    { value: "desc", label: "wiews più alto" },
  ];
  postFiltrati = computed(() => {
    const testo = this.ricerca().toLowerCase().trim();
    let list = this.bservice
      .blogpost()
      .filter((post) => post.title.toLowerCase().includes(testo));

    if (this.order() === "asc")
      list = [...list].sort((a, b) => a.views - b.views);
    if (this.order() === "desc")
      list = [...list].sort((a, b) => b.views - a.views);

    return list;
  });

  ngOnInit(): void {
    this.bservice.caricablog(0, 0);
  }
}
