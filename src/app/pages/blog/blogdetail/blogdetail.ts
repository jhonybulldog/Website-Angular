import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Post, BlogService } from "../blog.service";
@Component({
  imports: [RouterLink],
  selector: "app-blogdetail",
  styleUrl: "./blogdetail.css",
  templateUrl: "./blogdetail.html",
})
export class Blogdetail implements OnInit {
  private route = inject(ActivatedRoute);
  private bService = inject(BlogService);
  blog: Post | undefined;
  idblog: String | null = null;
  Like = false;
  Dislike = false;

  putLike() {
      if (this.Dislike) {
        this.blog!.reactions.dislikes--;
        this.Dislike = false;
      }

      if (!this.Like) {
        this.blog!.reactions.likes++;
        this.Like = true;
      }
  }

  putDislike() {
      if (this.Like) {
        this.blog!.reactions.likes--;
        this.Like = false;
      }

      if (!this.Dislike) {
        this.blog!.reactions.dislikes++;
        this.Dislike = true;
      }
  }
  ngOnInit(): void {
    this.idblog = this.route.snapshot.paramMap.get("id");

    const id = Number(this.idblog);
    this.blog = this.bService.blogpost().find((blog) => blog.id === id);
  }
}
