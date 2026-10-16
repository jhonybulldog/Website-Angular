import { Component, input } from '@angular/core';
import { Post } from '../../models/blog.model'; 
import { RouterLink } from '@angular/router';
@Component({
  imports: [RouterLink],
  selector: 'app-blogcard',
  styleUrl: './blogcard.css',
  templateUrl: './blogcard.html',
})
export class Blogcard {
  blog = input.required<Post>();
}
