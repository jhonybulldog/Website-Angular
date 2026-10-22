import { Component, inject } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { map, shareReplay, switchMap } from "rxjs";
import { BlogService } from "../../service/blog.service";
import { Post } from "../../models/blog.model";
import { Loader } from "../../../../shared/loader/loader";

@Component({
  imports: [RouterLink, Loader],
  selector: "app-blogdetail",
  styleUrl: "./blogdetail.css",
  templateUrl: "./blogdetail.html",
  providers: [BlogService],
})
export class Blogdetail {
  private route = inject(ActivatedRoute);
  private bService = inject(BlogService);
  private id = Number(this.route.snapshot.paramMap.get("id"));
  Like = false;
  Dislike = false;

  blog$ = this.bService.caricaPost(this.id);
  autore$ = this.blog$.pipe(switchMap((post) => this.bService.caricaAutore(post.userId)));
  comments$ = this.bService.loadComments(this.id).pipe(map((response) => response.comments));

  putLike(post: Post) {
    if (this.Dislike) {
      post.reactions.dislikes--;
      this.Dislike = false;
    }
    if (!this.Like) {
      post.reactions.likes++;
      this.Like = true;
    }
  }

  putDislike(post: Post) {
    if (this.Like) {
      post.reactions.likes--;
      this.Like = false;
    }
    if (!this.Dislike) {
      post.reactions.dislikes++;
      this.Dislike = true;
    }
  }
}