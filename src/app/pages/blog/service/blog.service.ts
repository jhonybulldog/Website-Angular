import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PostsResponse, Post, Author, CommentsResponse } from "../models/blog.model";
import { BehaviorSubject, delay, finalize } from "rxjs";
@Injectable()
export class BlogService {
  private http = inject(HttpClient);
  private url = "https://dummyjson.com/posts";
    private loading = new BehaviorSubject<boolean>(false);
    loading$ = this.loading.asObservable();
  caricablog(limit: number, skip: number, order: string = "", sortBy: string ="", research: string = "") {
    this.loading.next(true)
   return  this.http
      .get<PostsResponse>(this.url, {
        params: {
          limit: limit,
          skip: skip,
          sortBy: sortBy,
          order: order,
          q: research,
        },
      }).pipe(delay(1000), finalize(()=> this.loading.next(false)))
  }
  loadUserPosts() {
  const userId = localStorage.getItem("userId");
  return this.http.get<PostsResponse>(`${this.url}/user/${userId}`);
  }
  caricaPost(id: number) {
    return this.http.get<Post>(`${this.url}/${id}`).pipe(delay(1000));
  }
  caricaAutore(id: number) {
    return this.http.get<Author>(`https://dummyjson.com/users/${id}`).pipe(delay(1000));
  }
  loadComments(postId: number) {
  return this.http.get<CommentsResponse>(
    `https://dummyjson.com/comments/post/${postId}`,
  ).pipe(delay(1000));
}
}
