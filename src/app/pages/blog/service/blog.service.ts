import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PostsResponse, Post, Author, CommentsResponse } from "../models/blog.model";
@Injectable()
export class BlogService {
  private http = inject(HttpClient);
  private url = "https://dummyjson.com/posts";
  caricablog(limit: number, skip: number, order: string = "", sortBy: string ="", research: string = "") {
   return  this.http
      .get<PostsResponse>(this.url, {
        params: {
          limit: limit,
          skip: skip,
          sortBy: sortBy,
          order: order,
          q: research,
        },
      })
  }
  loadUserPosts() {
  const userId = localStorage.getItem("userId");
  return this.http.get<PostsResponse>(`${this.url}/user/${userId}`);
  }
  caricaPost(id: number) {
    return this.http.get<Post>(`${this.url}/${id}`);
  }
  caricaAutore(id: number) {
    return this.http.get<Author>(`https://dummyjson.com/users/${id}`);
  }
  loadComments(postId: number) {
  return this.http.get<CommentsResponse>(
    `https://dummyjson.com/comments/post/${postId}`,
  );
}
}
