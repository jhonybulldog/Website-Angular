import { Component, OnInit, signal, computed } from '@angular/core';
import { inject } from '@angular/core';
import { BlogService } from './blog.service';
import { FormsModule } from '@angular/forms';
import { Blogcard } from './blogcard/blogcard';
@Component({
  imports: [FormsModule, Blogcard],
  selector: 'app-blog',
  styleUrl: './blog.css',
  templateUrl: './blog.html',
})
export class Blog implements OnInit{
  private bservice = inject(BlogService);
  blogpost = this.bservice.blogpost
  limit=21;
  paginaCorrente = signal(1)

  totaleblog = this.bservice.totaleblog;
  
  numeroPagine = computed(() => Math.ceil(this.totaleblog() / this.limit));

  pagine = computed(() =>
  Array(this.numeroPagine()).fill(0).map((_, i) => i + 1),  
);


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
