import { Component, inject } from '@angular/core';
import { BlogService } from '../../../../blog/service/blog.service';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Blogcard } from '../../../../blog/components/blogcard/blogcard';

@Component({
  imports: [AsyncPipe, Blogcard],
  selector: 'app-my-blog',
  styleUrl: './my-blog.css',
  templateUrl: './my-blog.html',
  providers: [BlogService]
})
export class MyBlog {
    private blogService = inject(BlogService);
  userPosts$ = this.blogService
    .loadUserPosts()
    .pipe(map((response) => response.posts));
}
