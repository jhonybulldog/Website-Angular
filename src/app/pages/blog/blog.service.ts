import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    blogpost = signal<Post[]>([])
    private http = inject(HttpClient)
    private url = "https://dummyjson.com/posts";
    totaleblog = signal(0)
    caricablog(limit: number, skip: number){
        this.http.get<PostsResponse>(this.url, {
            params: {
                limit: limit,
                skip: skip,
            },
        }).subscribe((risposta) => {
                this.blogpost.set(risposta.posts);
                this.totaleblog.set(risposta.total);
        });
    }
}
