import { Component, model } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-searchbox',
  styleUrl: './searchbox.css',
  templateUrl: './searchbox.html',
})
export class Searchbox {
  value = model.required<string>()
}
