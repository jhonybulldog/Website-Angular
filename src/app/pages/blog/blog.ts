import { Component, OnInit, computed, inject, signal } from "@angular/core";
import { BlogService } from "./blog.service";
import { Bloglist } from "./bloglist/bloglist";
import { Searchbox } from "../shared/searchbox/searchbox";

@Component({
  imports: [Bloglist, Searchbox],
  selector: "app-blog",
  styleUrl: "./blog.css",
  templateUrl: "./blog.html",
  providers: [BlogService],
})
export class Blog implements OnInit {
  private bservice = inject(BlogService);

  ricerca = signal("");

  postFiltrati = computed(() => {
    const testo = this.ricerca().toLowerCase().trim();
    return this.bservice
      .blogpost()
      .filter((post) => post.title.toLowerCase().includes(testo));
  });

  ngOnInit(): void {
    this.bservice.caricablog(0, 0);
  }
}