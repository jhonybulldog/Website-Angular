import { Component, computed, input, linkedSignal, signal } from "@angular/core";
import { Post } from "../blog.service";
import { Blogcard } from "../blogcard/blogcard";
import { LimitSelector } from "../../shared/limit-selector/limit-selector";
import { Pagination } from "../../shared/pagination/pagination";

@Component({
  imports: [Blogcard, LimitSelector, Pagination],
  selector: "app-bloglist",
  styleUrl: "./bloglist.css",
  templateUrl: "./bloglist.html",
})
export class Bloglist {
  posts = input.required<Post[]>();

  limit = signal(21);
  paginaCorrente = linkedSignal(() => {
    this.posts();
    return 1;
  });

  numeroPagine = computed(() => Math.ceil(this.posts().length / this.limit()));

  postPagina = computed(() => {
    const skip = (this.paginaCorrente() - 1) * this.limit();
    return this.posts().slice(skip, skip + this.limit());
  });

  caricaPagina(pagina: number) {
    this.paginaCorrente.set(pagina);
  }
}