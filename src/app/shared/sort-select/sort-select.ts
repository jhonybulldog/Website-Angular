import { Component , output, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-sort-select',
  styleUrl: './sort-select.css',
  templateUrl: './sort-select.html',
})
export class SortSelect {
  changed = output<{ label: string; sortBy: string; order: string }>();  
  options = input.required<{ sortBy: string; order: string; label: string }[]>();
}
