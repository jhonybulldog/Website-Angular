import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  imports: [FormsModule],
  selector: 'app-limit-selector',
  styleUrl: './limit-selector.css',
  templateUrl: './limit-selector.html',
})
export class LimitSelector {
  limit = model.required<number>();
  opzioni = [5, 10, 20, 50, 100];
}
