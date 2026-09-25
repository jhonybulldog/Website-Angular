import { Component, OnInit, signal, computed } from '@angular/core';
import { inject } from '@angular/core';
import { BlogService } from './blog.service';
import { Blogcard } from './blogcard/blogcard';
import { LimitSelector } from '../shared/limit-selector/limit-selector';
import { Pagination } from '../shared/pagination/pagination';

@Component({
  imports: [ Blogcard, LimitSelector, Pagination],
  selector: 'app-blog',
  styleUrl: './blog.css',
  templateUrl: './blog.html',
  providers: [BlogService]
})
export class Blog implements OnInit{
  private bservice = inject(BlogService);
  blogpost = this.bservice.blogpost
  limit=21;
  paginaCorrente = signal(1)

  totaleblog = this.bservice.totaleblog;
  
  numeroPagine = computed(() => Math.ceil(this.totaleblog() / this.limit));


  caricaPagina(pagina: number) {
    const skip = (pagina - 1) * this.limit;
    this.paginaCorrente.set(pagina);

    this.bservice.caricablog(
      this.limit,
      skip,
    );
  }

  ngOnInit(): void {
    this.caricaPagina(1);    
  }
}
