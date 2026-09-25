import { Injectable, inject, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";


export interface Author {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
}

export interface Reactions {
  likes: number;
  dislikes: number;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: Reactions;
  views: number;
  userId: number;
}

export interface PostsResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

@Injectable()
export class BlogService {
  blogpost = signal<Post[]>([]);
  private http = inject(HttpClient);
  private url = "https://dummyjson.com/posts";
  totaleblog = signal(0);
  caricablog(limit: number, skip: number) {
    this.http
      .get<PostsResponse>(this.url, {
        params: {
          limit: limit,
          skip: skip,
        },
      })
      .subscribe((risposta) => {
        this.blogpost.set(risposta.posts);
        this.totaleblog.set(risposta.total);
      });
  }
  caricaPost(id: number) {
    return this.http.get<Post>(`${this.url}/${id}`);
  }
  caricaAutore(id: number) {
  return this.http.get<Author>(`https://dummyjson.com/users/${id}`);
}
}
