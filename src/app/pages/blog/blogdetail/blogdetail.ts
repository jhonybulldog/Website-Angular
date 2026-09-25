import { Component, inject, OnInit, signal } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Post, BlogService, Author } from "../blog.service";

@Component({
  imports: [RouterLink],
  selector: "app-blogdetail",
  styleUrl: "./blogdetail.css",
  templateUrl: "./blogdetail.html",
  providers: [BlogService],
})
export class Blogdetail implements OnInit {
  private route = inject(ActivatedRoute);
  private bService = inject(BlogService);
  blog = signal<Post | undefined>(undefined);
  idblog: string | null = null;
  Like = false;
  Dislike = false;
  autore = signal<Author | undefined>(undefined);
  putLike() {
    const attuale = this.blog();
    if (!attuale) return;

    if (this.Dislike) {
      attuale.reactions.dislikes--;
      this.Dislike = false;
    }
    if (!this.Like) {
      attuale.reactions.likes++;
      this.Like = true;
    }
    this.blog.set({ ...attuale });
  }

  putDislike() {
    const attuale = this.blog();
    if (!attuale) return;

    if (this.Like) {
      attuale.reactions.likes--;
      this.Like = false;
    }
    if (!this.Dislike) {
      attuale.reactions.dislikes++;
      this.Dislike = true;
    }
    this.blog.set({ ...attuale });
  }

  ngOnInit(): void {
    this.idblog = this.route.snapshot.paramMap.get("id");
    const id = Number(this.idblog);

    this.bService.caricaPost(id).subscribe((post) => {
      this.blog.set(post);
            this.bService.caricaAutore(post.userId).subscribe((autore) => {
        this.autore.set(autore);
      })
    });
    

  }
}