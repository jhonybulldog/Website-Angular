import { Component , output, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-sort-select',
  styleUrl: './sort-select.css',
  templateUrl: './sort-select.html',
})
export class SortSelect {
  changed = output<string>();
  
  options = input.required<{ value: string; label: string }[]>();
}
